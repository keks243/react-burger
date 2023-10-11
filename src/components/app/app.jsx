import React from "react";
import { DataContext } from "./contexts.js";
import { NumberContext } from "./contexts.js";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.js";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.js";
import BurgerConstructor from "../burger-constructor/burger-constructor.js";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions.js";

function App() {
  const number = useState();
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients(URL));
  }, [dispatch]);

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <BurgerIngredients />

        <BurgerConstructor />
      </main>
    </section>
  );
}

export default App;
