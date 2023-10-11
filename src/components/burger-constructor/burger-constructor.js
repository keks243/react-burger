import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useState, useEffect, useContext, useReducer } from "react";
import { DataContext } from "../app/contexts.js";
import { useDispatch, useSelector } from "react-redux";
import styles from "./burger-constructor.module.css";
import OredertDetails from "../order-details/order-details";
import PropTypesItem from "../proptypes/proptypes-item";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NumberContext } from "../app/contexts.js";
import { getConstructorIngredients } from "../../services/ingredients/selectors.js";
import { deleteIngredient } from "../../services/ingredients/actions.js";

function BurgerConstructor() {
  const [open, setOpen] = useState(false);
  const URL = "https://norma.nomoreparties.space/api/orders";

  let bodyPost = [];
  let bun = { name: "", image: "", price: "" };
  let totalCost = 0;

  const data = useSelector(getConstructorIngredients);
  const dispatch = useDispatch();
  const onDelete = (ingredientObj) => {
    dispatch(deleteIngredient(ingredientObj));
  };

  for (let index = 0; index < data.length; index++) {
    bodyPost.push(data[index]._id);
  }

  for (let index = 0; index < data.length; index++) {
    if (data.find((e) => e.type === "bun")) {
      bun = {
        name: data[index].name,
        image: data[index].image,
        price: data[index].price,
      };
      break;
    }
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
      .then((res) => {
        setOpen(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className={styles.container}>
      <section className={styles.subContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />
        <section className={`custom-scroll ${styles.ingredients}`}>
          {data
            .filter((ingredient) => ingredient.type !== "bun")
            .map((item, index) => (
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={item.uniqId}
                handleClose={() => onDelete(item)}
              />
            ))}
        </section>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
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
          <OredertDetails />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
