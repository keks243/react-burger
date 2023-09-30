import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(URL)
      .then((res) =>
        res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </main>
    </section>
  );
}

export default App;
