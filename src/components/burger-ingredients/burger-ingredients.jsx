import React from "react";
import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PropTypesItem from "../proptypes/proptypes-item";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Card from "../card/card";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { getConstructorIngredients } from "../../services/constructor/selectors.js";
import { GET_SELECT_INGREDIENT } from "../../services/ingredients/actions.js";

function BurgerIngredients() {
  const [current, setCurrent] = useState();
  const [open, setOpen] = useState(false);
 

  const constructorIngredients = useSelector(getConstructorIngredients);

  const dispatch = useDispatch();
  // @ts-ignore
  const getIngredient = (ingredientObj) => {
    dispatch({ type: GET_SELECT_INGREDIENT, payload: ingredientObj });
  };
  // @ts-ignore
  const data = useSelector((state) => state.ingredients.ingredients);

  const types = ["bun", "main", "sauce"];
  const typesRu = ["Булки", "Начинки", "Соусы"];

  const [bun, inViewBun] = useInView({
    threshold: 0.6,
  });

  const [main, inViewMain] = useInView({
    threshold: 0.4,
  });

  const [sauce, inViewSauce] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inViewMain) {
      // @ts-ignore
      setCurrent("main");
    }
  }, [inViewMain]);

  useEffect(() => {
    if (inViewSauce) {
      // @ts-ignore
      setCurrent("sauce");
    }
  }, [inViewSauce]);

  useEffect(() => {
    if (inViewBun) {
      // @ts-ignore
      setCurrent("bun");
    }
  }, [inViewBun]);
  function getItem(item) {
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
            // @ts-ignore
            onClick={setCurrent}
          >
            {typesRu[index]}
          </Tab>
        ))}
      </section>
      <section className={`custom-scroll ${styles.itemsContainer}`}>
        <section ref={bun} className={styles.itemContainer}>
          <h2
            className="text text_type_main-medium"
          >
            Булки
          </h2>

          <section className={styles.itemSubContainer}>
            {data
              // @ts-ignore
              .filter((ingredient) => ingredient.type === "bun")
              // @ts-ignore
              .map((item) => (
                <section key={item._id} onClick={() => getItem(item)}>
                  <Card item={item} />
                </section>
              ))}
          </section>
        </section>

        <section ref={main} className={styles.itemContainer}>
          <h2
            className="text text_type_main-medium"
          >
            Начинки
          </h2>

          <section className={styles.itemSubContainer}>
            {data
              // @ts-ignore
              .filter((ingredient) => ingredient.type === "main")
              // @ts-ignore
              .map((item) => (
                <section key={item._id} onClick={() => getItem(item)}>
                  <Card item={item} />
                </section>
              ))}
          </section>
        </section>
        <section ref={sauce} className={styles.itemContainer}>
          <h2
            className="text text_type_main-medium"
            
          >
            Соусы
          </h2>

          <section className={styles.itemSubContainer}>
            {data
              // @ts-ignore
              .filter((ingredient) => ingredient.type === "sauce")
              // @ts-ignore
              .map((item) => (
                <section key={item._id} onClick={() => getItem(item)}>
                  <Card item={item} />
                </section>
              ))}
          </section>
        </section>
      </section>
    </section>
  );
}

export default BurgerIngredients;
