import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { useContext } from "react";
import { NumberContext } from "../app/contexts.js";

const OredertDetails = () => {

  const [number,setNumber] = useContext(NumberContext)

  return (
    <section className={styles.container}>
      <h2 className={`text text_type_digits-large pt-9 ${styles.number}`}>
        {number == undefined ? '...' : number}
      </h2>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img src={done}></img>
      <span className="text text_type_main-default">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
};

export default OredertDetails;
