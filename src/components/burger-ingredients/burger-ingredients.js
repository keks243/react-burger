import React from "react";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../app/contexts.js";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypesItem from "../proptypes/proptypes-item";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Card from "../card/card";
import { useSelector, useDispatch } from "react-redux";
import { addIngredient } from "../../services/ingredients/actions.js";
import { deleteIngredient } from "../../services/ingredients/actions.js";
import { getConstructorIngredients } from "../../services/ingredients/selectors.js";
import { GET_SELECT_INGREDIENT } from "../../services/ingredients/actions.js";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("bun");
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.ingredients.ingredients);
  const ingredient = useSelector((state) => state.ingredients.ingredient);
  const types = ["bun", "main", "sauce"];
  const typesRu = ["Булки", "Соусы", "Начинки"];

  const constructorIngredients = useSelector(getConstructorIngredients);

  const dispatch = useDispatch();


  const getIngredient = (ingredientObj) => {
    // let isBun = false;
    // for (let index = 0; index < constructorIngredients.length; index++) {
    //   if (constructorIngredients[index].type === "bun") {
    //     isBun = true;
        
    //   }
    // }
    // let selectBun = constructorIngredients.find((e) => e.type === "bun");
    // if (isBun && ingredientObj.type === 'bun') {
    //   dispatch(deleteIngredient(selectBun));
    //   dispatch(addIngredient(ingredientObj));
    // } else {
    //   dispatch(addIngredient(ingredientObj));
    // }

    dispatch(addIngredient(ingredientObj));
    dispatch({ type: GET_SELECT_INGREDIENT, payload: ingredientObj });
  };
  
  function getItem(item) {
    // setOpen(true);
    getIngredient(item);
  }

  return (
    <section className={styles.container}>
      <h1
        className={`text text_type_main-large ${styles.burgerIngredientsTitle}`}
      >
        Соберите бургер
      </h1>
      <section className={styles.tabs}>
        {types.map((item, index) => (
          <Tab
            key={index}
            active={current === item}
            value={item}
            onClick={setCurrent}
          >
            {typesRu[index]}
          </Tab>
        ))}
      </section>
      <section className={`custom-scroll ${styles.itemsContainer}`}>
        {types.map((block, indexBlocks) => (
          <section key={indexBlocks} className={styles.itemContainer}>
            <h2
              className="text text_type_main-medium"
              style={{ textAlign: "start" }}
            >
              {typesRu[indexBlocks]}
            </h2>
            <section className={styles.itemSubContainer}>
              {data
                .filter((ingredient) => ingredient.type === block)
                .map((item, indexItems) => (
                  <section key={indexItems} onClick={() => getItem(item)}>
                    <Card item={item} />
                  </section>
                ))}
            </section>
          </section>
        ))}
        {open && (
          <Modal closeModal={() => setOpen(false)} title="Детали ингредиента">
            <IngredientDetails item={ingredient} />
          </Modal>
        )}
      </section>
    </section>
  );
}

export default BurgerIngredients;
