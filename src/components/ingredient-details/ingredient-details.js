import React from "react";
import { useEffect, useState } from "react";
import styles from "./ingredient-details.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const IngredientDetails = () => {
  let itemId  = useParams();
  const location = useLocation();
  const ingredient = useSelector((state) => state.ingredients.ingredients);
  const [data, setData] = useState({});
  
  useEffect(()=> {
      if (ingredient.length != 0) {
        setData(ingredient.find(item => item._id === itemId.id))
      }
  }, [ingredient, location])


  return (
    <section className={styles.container}>
      <img src={data.image} alt="dataImage"/>
      <span className={`text text_type_main-medium ${styles.item}`}>
        {data.name}
      </span>
      <section className={styles.downContainer}>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Каллории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Бекли,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
      </section>
    </section>
  );
};


export default IngredientDetails;
