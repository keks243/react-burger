import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { DataContext } from "../app/data-context.js";
import styles from "./burger-constructor.module.css";
import OredertDetails from "../order-details/order-details";
import PropTypesItem from "../proptypes/proptypes-item";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor() {
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState();
  const data = useContext(DataContext);
  const bodyPost = ["643d69a5c3f7b9001cfa093c"];
  const URL = "https://norma.nomoreparties.space/api/orders"

  let bunIamge = "";

  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum += data[index].price;
    if (data.filter((e) => e.type === "bun")) {
      bunIamge = data[index].image;
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
      .then((res) => console.log(res))
      .then(setOpen(true))
      .catch((err) => console.log(err));
  }

  return (
    <section className={styles.container}>
      <section className={styles.subContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bunIamge}
        />
        <section className={`custom-scroll ${styles.ingredients}`}>
          {data
            .filter((ingredient) => ingredient.type !== "bun")
            .map((item, index) => (
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                key={index}
              />
            ))}
        </section>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={bunIamge}
        />
      </section>
      <section className={styles.bottomContainer}>
        <section className={styles.price}>
          <span className="text text_type_digits-medium">{sum}</span>
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypesItem),
};

export default BurgerConstructor;
