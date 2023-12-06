import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import { getCookie } from "../../coockie";
import { IngredientTypes, BunTypes } from '../../services/types/ingredient-types'
import {useAppDispatch, useAppSelector} from "../../hooks/hooks-redux";


import {
  SORT_INGREDIENT,
  DELETE_INGREDIENT,
} from "../../services/constructor/actions";
import {
  addIngredient,
  postOrderIngredients,
} from "../../services/constructor/actions";
import BurgerConstructorMain from "../burger-constructor-main/burger-constructor-main";
import styles from "./burger-constructor.module.css";
import OrdertDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getConstructorIngredients } from "../../services/constructor/selectors";
import { deleteIngredient } from "../../services/constructor/actions";

interface Ingredient {
  _id: string;
  uniqId: string;
  type: string;
  name: string;
  image: string;
  price: number;
}

const BurgerConstructor: FC = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const number = useAppSelector(
    (state) => state.ingredientsСonstructor.number
  );
  let accessToken = getCookie("token");
  let bodyPost: string[] = [];
  let bun: BunTypes = {
    _id: "",
    uniqId: '',
    type: "",
    name: "",
    image: "",
    price: 0,
  };
  let totalCost = 0;

  const dispatch = useAppDispatch();

  const onDelete = (ingredientObj: IngredientTypes) => {
    dispatch(deleteIngredient(ingredientObj));
  };

  const data = useSelector(getConstructorIngredients);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(ingredientObj: IngredientTypes  ) {
      dispatch(addIngredient(ingredientObj));
    },
  });

  data.forEach((e: Ingredient) => {
    if (e.type === "bun") {
      totalCost += e.price * 2;
    } else {
      totalCost += e.price;
    }
  });

  for (let index = 0; index < data.length; index++) {
    bodyPost.push(data[index]._id);
  }

  if (data.find((e: Ingredient | undefined) => e && e.type === "bun")) {
    bun = {
      _id: data.find((e: Ingredient | undefined) => e && e.type === "bun")?._id || "",
      uniqId: data.find((e: Ingredient | undefined) => e && e.type === "bun")?.uniqId || "",
      type: data.find((e: Ingredient | undefined) => e && e.type === "bun")?.type || "",
      name: data.find((e: Ingredient | undefined) => e && e.type === "bun")?.name || "",
      image: data.find((e: Ingredient | undefined) => e && e.type === "bun")?.image || "",
      price: data.find((e: Ingredient | undefined) => e && e.type === "bun")?.price || 0,
    };
  }

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const arrayNoBun = data.filter((item: Ingredient) => item.type !== "bun");
    const findBun = data.filter((item: Ingredient) => item.type === "bun");
    const dragCard = arrayNoBun[dragIndex];
    const newCards = [...arrayNoBun];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    newCards.push(...findBun);
    dispatch({ type: SORT_INGREDIENT, payload: newCards });
  };

  const openModalConstructor = () => {
    if (accessToken) {
      openModal();
      dispatch(postOrderIngredients(bodyPost));
    } else {
      navigate("/login");
    }
  };

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
            .filter((ingredient: IngredientTypes) => ingredient.type !== "bun")
            .map((item: IngredientTypes, index: number) => (
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
        <Modal setActive={closeModal} title=''>
          <OrdertDetails number={number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
