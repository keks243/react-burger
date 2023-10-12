import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useState, useEffect, useContext, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { addIngredient, SORT_INGREDIENT } from "../../services/ingredients/actions.js";
import BurgerConstructorMain from "../burger-constructor-main/burger-constructor-main.js";
import styles from "./burger-constructor.module.css";
import OrdertDetails from "../order-details/order-details";
import PropTypesItem from "../proptypes/proptypes-item";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getConstructorIngredients } from "../../services/ingredients/selectors.js";
import { deleteIngredient } from "../../services/ingredients/actions.js";


function BurgerConstructor() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState();
  const URL = "https://norma.nomoreparties.space/api/orders";

  let bodyPost = [];
  let bun = { name: "", image: "", price: "" };
  let totalCost = 0;

  const data = useSelector(getConstructorIngredients);
  const dispatch = useDispatch();
  const onDelete = (ingredientObj) => {
    dispatch(deleteIngredient(ingredientObj));
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(ingredientObj) {
      dispatch(addIngredient(ingredientObj));
    },
  });

  data.forEach((e) => {
    if (e.type === "bun") {
      totalCost += e.price * 2;
    } else {
      totalCost += e.price;
    }
  });

  for (let index = 0; index < data.length; index++) {
    bodyPost.push(data[index]._id);
  }

  if (data.find((e) => e.type === "bun")) {
    bun = {
      name: data.find((e) => e.type === "bun").name,
      image: data.find((e) => e.type === "bun").image,
      price: data.find((e) => e.type === "bun").price,
    };
  }

  const moveCard = (dragIndex, hoverIndex) => {
    const arrayNoBun = data.filter(item => item.type !== 'bun')
    const findBun = data.filter(item => item.type === 'bun')
    const dragCard = arrayNoBun[dragIndex]
    const newCards = [...arrayNoBun]
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
    newCards.push(...findBun)
    dispatch({type: SORT_INGREDIENT, payload: newCards})
}

  function openModal() {
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({ ingredients: bodyPost }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((res) => setNumber(res.order.number))
      .then(setOpen(true))
      .catch((err) => console.log(err));
  }

  return (
    <section ref={dropRef} className={styles.container}>
      <section className={styles.subContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name !== '' ? `${bun.name} (верх)` : ''}
          price={bun.price}
          thumbnail={bun.image}
        />
        <section className={`custom-scroll ${styles.ingredients}`}>
          {data
            .filter((ingredient) => ingredient.type !== "bun")
            .map((item, index) => (
              <BurgerConstructorMain
                key={item.uniqId}
                data={item}
                index={index}
                id={item.uniqId}
                moveCard={moveCard}
                onDelete={onDelete}
              />
            ))}
        </section>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name !== '' ? `${bun.name} (низ)` : ''}
          price={bun.price}
          thumbnail={bun.image}
        />
      </section>
      <section className={styles.bottomContainer}>
        <section className={styles.price}>
          <span className="text text_type_digits-medium">{totalCost}</span>
          <CurrencyIcon type="primary" />
        </section>

        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={openModal}
        >
          Оформить заказ
        </Button>
      </section>
      {open && (
        <Modal closeModal={() => setOpen(false)}>
          <OrdertDetails number={number} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
