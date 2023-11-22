import React, { useState, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";
import { getConstructorIngredients } from "../../services/constructor/selectors";
import { GET_SELECT_INGREDIENT } from "../../services/ingredients/actions";
import { useLocation, useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Card from "../card/card";
import Modal from "../modal/modal";
import styles from "./burger-ingredients.module.css";

interface Ingredient {
  _id: string;
  image: string;
  price: number;
  name: string;
  type: string;
}

interface BurgerIngredientsProps {}

function BurgerIngredients(props: BurgerIngredientsProps) {
  const [current, setCurrent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const constructorIngredients = useSelector(getConstructorIngredients);

  const dispatch = useDispatch();

  const getIngredient = (ingredientObj: Ingredient) => {
    dispatch({ type: GET_SELECT_INGREDIENT, payload: ingredientObj });
  };

  const data = useSelector((state: any) => state.ingredients.ingredients);

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
      setCurrent("main");
    }
  }, [inViewMain]);

  useEffect(() => {
    if (inViewSauce) {
      setCurrent("sauce");
    }
  }, [inViewSauce]);

  useEffect(() => {
    if (inViewBun) {
      setCurrent("bun");
    }
  }, [inViewBun]);

  const getItem = (item: Ingredient) => {
    getIngredient(item);
  };

  return (
    <section className={styles.container}>
      <h1 className={`text text_type_main-large ${styles.burgerIngredientsTitle}`}>
        Соберите бургер
      </h1>
      <section className={styles.tabs}>
        {types.map((item, index) => (
          <Tab
            key={index}
            active={current === item}
            value={item}
            onClick={() => setCurrent(item)}
          >
            {typesRu[index]}
          </Tab>
        ))}
      </section>
      <section className={`custom-scroll ${styles.itemsContainer}`}>
        <section ref={bun} className={styles.itemContainer}>
          <h2 className="text text_type_main-medium">Булки</h2>

          <section className={styles.itemSubContainer}>
            {data
              .filter((ingredient: Ingredient) => ingredient.type === "bun")
              .map((item: Ingredient) => (
                <section key={item._id} onClick={() => getItem(item)}>
                  <Card item={item} />
                </section>
              ))}
          </section>
        </section>

        <section ref={main} className={styles.itemContainer}>
          <h2 className="text text_type_main-medium">Начинки</h2>

          <section className={styles.itemSubContainer}>
            {data
              .filter((ingredient: Ingredient) => ingredient.type === "main")
              .map((item: Ingredient) => (
                <section key={item._id} onClick={() => getItem(item)}>
                  <Card item={item} />
                </section>
              ))}
          </section>
        </section>
        <section ref={sauce} className={styles.itemContainer}>
          <h2 className="text text_type_main-medium">Соусы</h2>

          <section className={styles.itemSubContainer}>
            {data
              .filter((ingredient: Ingredient) => ingredient.type === "sauce")
              .map((item: Ingredient) => (
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
