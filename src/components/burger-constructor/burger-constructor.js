import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import styles from "./burger-constructor.module.css";
import OredertDetails from "../order-details/order-details";
import PropTypesItem from "../proptypes/proptypes-item";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data }) {
  const [open, setOpen] = useState(false);

  let bun = "";
  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum += data[index].price;
    if (data.filter((e) => e.type === "bun")) {
      bun = data[index].image;
      break;
    }
  }

  return (
    <section className={styles.container}>
      <section className={styles.subContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={bun}
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
          thumbnail={bun}
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
          onClick={() => setOpen(true)}
        >
          Оформить заказ
        </Button>
      </section>
      {open && (
        <Modal closeModal={() => setOpen(false)} title="">
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
