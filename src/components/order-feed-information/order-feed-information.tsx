import styles from "./order-feed-information.module.css";
import { useAppSelector } from "../../hooks/hooks-redux";
import { IOrderLineData } from "../../services/web-socket/actions";
const OrderFeedInformation = () => {
  const myData: IOrderLineData = useAppSelector(
    (state) => state.orderLineDate.orderLineData
  );

  return (
    <div className={styles.orderFeedInformationContainer}>
      <section className={styles.completeContainer}>
        <div className={styles.completeSubContainer}>
          <h3 className={styles.title}>Готовы:</h3>
          <div className={styles.numberOrder}>
            {myData.orders.map((item, index) => (
              <section key={index}>
                {index <= 11 ? (
                  <div
                    className={styles.number}
                  >
                    {item.status === "done" ? item.number : ""}
                  </div>
                ) : (
                  <></>
                )}
              </section>
            ))}
          </div>
        </div>
        <div className={`${styles.completeSubContainer}`}>
          <h3 className={styles.title}>В работе:</h3>
          <div className={styles.numberOrder}>
            {myData.orders.map((item, index) => (
              <section key={index}>
                {index <= 11 ? (
                  <div className={styles.complete}>
                    {item.status === "pending" ? item.number : ""}
                  </div>
                ) : (
                  <></>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
      <section>
        <h3 className={styles.title}>
          Выполнено за все время:
        </h3>
        <h1
          className={styles.completeAllTime} 
        >
          {myData.total}
        </h1>
      </section>
      <section>
        <h3 className={styles.title}>Выполнено за сегодня:</h3>
        <h1
          className={styles.completeAllTime} 
        >
          {myData.totalToday}
        </h1>
      </section>
    </div>
  );
};

export default OrderFeedInformation;
