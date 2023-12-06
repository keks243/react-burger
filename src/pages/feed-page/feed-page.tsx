import { useEffect } from "react";
import OrderFeedList from "../../components/order-feed-list/order-feed-list";
import OrderFeedInformation from "../../components/order-feed-information/order-feed-information";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks-redux";
import {
  orderLineConnect,
  wsOrderLineClose,
} from "../../services/web-socket/actions";
import styles from "./feed-page.module.css";

const FeedPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(orderLineConnect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(wsOrderLineClose());
    };
  }, [dispatch]);
  const myDataFeed = useAppSelector(
    (state) => state.orderLineDate.orderLineData
  );

  return (
    <div className={styles.containerFeedPage}>
      <h2 className="text text_type_main-large pt-10 pb-5">Лента заказов</h2>
      <section className={styles.subContainerFeedPage}>
        <OrderFeedList Width={640} Feed={myDataFeed} />
        <OrderFeedInformation />
      </section>
    </div>
  );
};

export default FeedPage;
