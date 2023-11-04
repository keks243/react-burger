import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { getConstructorIngredients } from "../../services/constructor/selectors";
import { useDispatch, useSelector } from "react-redux";

const OrdertDetails = ({number}) => {

  return (
    <section className={styles.container}>
      <h2 className={`text text_type_digits-large pt-9 ${styles.number}`}>
       {number == undefined ? '...' : number}
      </h2>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img src={done} alt="orderIamge"></img>
      <span className="text text_type_main-default">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </section>
  );
};

OrdertDetails.propTypes = {
  number: PropTypes.number,
};

export default OrdertDetails;
