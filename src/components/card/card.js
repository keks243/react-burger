import React from "react";
import PropTypes from "prop-types";
import styles from "./card.module.css";
import PropTypesItem from "../proptypes/proptypes-item";
import { useDrag} from "react-dnd";
import { useSelector } from "react-redux";
import { getConstructorIngredients } from "../../services/ingredients/selectors.js";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Card({ item }) {
  const constructorIngredients = useSelector(getConstructorIngredients);
  let ingredientCounter = 0;

  const [{isDrag} , dragRef] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
})

  for (let index = 0; index < constructorIngredients.length; index++) {
    if (constructorIngredients[index]._id == item._id) {
      ingredientCounter += 1;
    }
  }

  return (
    <section  className={styles.item}>
      {ingredientCounter != 0 && (
        <section className={styles.counter}>
          <Counter count={ingredientCounter} size="default" extraClass="m-1" />
        </section>
      )}
      <img ref={dragRef} src={item.image} />
      <section className={styles.priceContainer}>
        <span className="text text_type_main-medium">{item.price}</span>
        <CurrencyIcon type="primary" />
      </section>
      <span className="text text_type_main-default">{item.name}</span>
    </section>
  );
}

Card.propTypes = PropTypesItem.isRequired;

export default Card;
