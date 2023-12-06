import { useEffect } from "react";
import styles from "./order-page.module.css";
import { userLogout } from "../../services/user-actions/actions";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks-redux";
import OrderFeedList from "../../components/order-feed-list/order-feed-list";
import {
  orderLineConnect,
  wsOrderLineClose,
} from "../../services/web-socket/actions";
import { getCookie } from "../../coockie";

const OrderPage = () => {
  const token = getCookie("token");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      orderLineConnect(`wss://norma.nomoreparties.space/orders?token=${token}`)
    );
    return () => {
      dispatch(wsOrderLineClose());
    };
  }, [dispatch]);

  const logout = () => {
    dispatch(userLogout(navigate));
  };

  const myDataFeed = useAppSelector(
    (state) => state.orderLineDate.orderLineData
  );

  return (
    <div className={styles.container}>
      <div className={styles.containerLeftMenu}>
        <div className={styles.containerLink}>
          <NavLink to="/profile" className={styles.link}>
            {({ isActive }) => (
              <span className={!isActive ? styles.selectLink : styles.link}>
                Профиль
              </span>
            )}
          </NavLink>
          <NavLink to="/profile/orders" className={styles.link}>
            {({ isActive }) => (
              <span className={isActive ? styles.selectLink : styles.link}>
                История заказов
              </span>
            )}
          </NavLink>
          <button className={styles.exitButton} onClick={logout}>
            Выход
          </button>
        </div>

        <div className={styles.infoContainer}>
          <span className={styles.info}>В этом разделе вы можете</span>
          <span className={styles.info}>изменить свои персональные данные</span>
        </div>
      </div>
      <div className={styles.OrderFeedListContainer}>
        <OrderFeedList Width={844} Feed={myDataFeed} visibleStatus={true} />
      </div>
    </div>
  );
};

export default OrderPage;
