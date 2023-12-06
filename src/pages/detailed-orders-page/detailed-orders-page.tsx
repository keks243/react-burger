import styles from "./detailed-orders-page.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks-redux";
import { getDetailedOrder } from "../../services/order/actions";
import DetailedOrder from "../../components/detailed-order/detailed-order";
const DetailedOrderPage = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const detailedOrder = useAppSelector((state) => state.detailedOrder.order);

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getDetailedOrder(id));
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className={styles.container}>
      <DetailedOrder
        numberOrder={detailedOrder[0]?.number}
        statusOrder={detailedOrder[0]?.status}
        name={detailedOrder[0]?.name}
        ingredients={detailedOrder[0]?.ingredients}
        date={detailedOrder[0]?.createdAt}
      />
    </div>
  );
};

export default DetailedOrderPage;
