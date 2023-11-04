import React from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import { useState, useEffect, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { useModal } from "../../hooks/useModal";
import { getCookie } from "../../coockie.js";
import {
  SORT_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/constructor/actions.js";
import { addIngredient } from "../../services/constructor/actions.js";
import BurgerConstructorMain from "../burger-constructor-main/burger-constructor-main.js";
import { postOrderIngredients } from "../../services/constructor/actions.js";
import styles from "./burger-constructor.module.css";
import OrdertDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getConstructorIngredients } from "../../services/constructor/selectors.js";
import { deleteIngredient } from "../../services/constructor/actions.js";

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate(); 
  const number = useSelector((state) => state.ingredientsСonstructor.number);
  let accessToken = getCookie("token");
  let bodyPost = [];
  let bun = { name: "", image: "", price: "" };
  let totalCost = 0;

  const dispatch = useDispatch();

  const onDelete = (ingredientObj) => {
    dispatch(deleteIngredient(ingredientObj));
  };

  const data = useSelector(getConstructorIngredients);

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
    const arrayNoBun = data.filter((item) => item.type !== "bun");
    const findBun = data.filter((item) => item.type === "bun");
    const dragCard = arrayNoBun[dragIndex];
    const newCards = [...arrayNoBun];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    newCards.push(...findBun);
    dispatch({ type: SORT_INGREDIENT, payload: newCards });
  };
  function openModalConstructor() {
    if (accessToken) {
      openModal();
      dispatch(postOrderIngredients(bodyPost));
    }else{
      navigate('/login')
    }
  }

  return (
    <section ref={dropRef} className={styles.container}>
      <section className={styles.subContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name !== "" ? `${bun.name} (верх)` : ""}
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
          text={bun.name !== "" ? `${bun.name} (низ)` : ""}
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
          onClick={openModalConstructor}
        >
          Оформить заказ
        </Button>
      </section>
      {isModalOpen && (
        <Modal setActive={closeModal}>
          <OrdertDetails number={number} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerConstructor;
