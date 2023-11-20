import React from "react";
import styles from "./card.module.css";
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { getConstructorIngredients } from "../../services/constructor/selectors";
import { Link, useLocation } from "react-router-dom";

import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

interface CardProps {
  item: {
    _id: string;
    image: string;
    price: number;
    name: string;
  };
}

function Card({ item }: CardProps) {
  const constructorIngredients = useSelector(getConstructorIngredients);
  let ingredientCounter = 0;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });
  const location = useLocation();

  for (let index = 0; index < constructorIngredients.length; index++) {
    if (constructorIngredients[index]._id === item._id) {
      ingredientCounter += 1;
    }
  }

  return (
    <Link
      to={`ingredients/${item._id}`}
      state={{ backgroundLocation: location }}
      className={styles.link}
      ref={dragRef}
    >
      <section className={styles.item}>
        {ingredientCounter !== 0 && (
          <section className={styles.counter}>
            <Counter
              count={ingredientCounter}
              size="default"
              extraClass="m-1"
            />
          </section>
        )}
        <img src={item.image} alt="cardImage" />
        <section className={styles.priceContainer}>
          <span className="text text_type_main-medium">{item.price}</span>
          <CurrencyIcon type="primary" />
        </section>
        <span className="text text_type_main-default">{item.name}</span>
      </section>
    </Link>
  );
}

export default Card;
