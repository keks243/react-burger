import React from "react";
import PropTypes from "prop-types";
import PropTypesItem from "../proptypes/proptypes-item";
import styles from "./ingredient-details.module.css";

const IngredientDetails = ({ item }) => {
  return (
    <section className={styles.container}>
      <img src={item.image} />
      <span className={`text text_type_main-medium ${styles.item}`}>
        {item.name}
      </span>
      <section className={styles.downContainer}>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Каллории,ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Бекли,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы,г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {item.calories}
          </span>
        </section>
      </section>
    </section>
  );
};

IngredientDetails.propTypes = PropTypesItem.isRequired;

export default IngredientDetails;
