import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import Modal from "../modal/modal";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypesItem from "../proptypes/proptypes-item";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Card from "../card/card";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("bun");
  const [open, setOpen] = useState(false);
  const [dataItem, setdataItem] = useState({});
  const types = ["bun", "main", "sauce"];
  const typesRu = ["Булки", "Соусы", "Начинки"];

  function getItem(item) {
    setdataItem(item);
    setOpen(true);
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
            <IngredientDetails item={dataItem} />
          </Modal>
        )}
      </section>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypesItem).isRequired,
};

export default BurgerIngredients;
