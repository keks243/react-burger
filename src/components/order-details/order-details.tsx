import React, { FC } from "react";
import styles from "./order-details.module.css";
import done from "../../images/done.png";
import { getConstructorIngredients } from "../../services/constructor/selectors";
import { useDispatch, useSelector } from "react-redux";

interface OrdertDetailsProps {
  number: unknown;
}

const OrdertDetails: FC<OrdertDetailsProps> = ({ number }) => {
  const orderNumber = typeof number === "number" ? number : null;

  return (
    <section className={styles.container}>
      <h2 className={`text text_type_digits-large pt-9 ${styles.number}`}>
        {orderNumber === null ? "..." : orderNumber}
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

export default OrdertDetails;
