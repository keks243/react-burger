import React from "react";
import { DataContext } from "./data-context.js";
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
        <DataContext.Provider value={data}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DataContext.Provider>
      </main>
    </section>
  );
}

export default App;
