import styles from "./order-feed-list.module.css";
import OrderCard from "../order-card/order-card";

interface IOrderFeedListProps {
  Width: number;
  Feed: {
    orders: {
      name: string;
      status: string;
      ingredients: {}[];
      createdAt: string;
      number: number;
    }[];
  };
  visibleStatus?: boolean;
}

const OrderFeedList = ({ Width, Feed, visibleStatus }: IOrderFeedListProps) => {
  return (
    <div
      className={styles.orderFeedContainer}
      style={{ maxWidth: `${Width}px` }}
    >
      <section className={`custom-scroll ${styles.orderFeedSubContainer}`}>
        {Feed.orders !== undefined &&
          Feed.orders?.map((item, index) => (
            <OrderCard
              key={index}
              visibleStatus={visibleStatus}
              status={item.status}
              ingredient={item.ingredients}
              date={item.createdAt}
              numberOrder={item.number}
              name={item.name}
            />
          ))}
      </section>
    </div>
  );
};

export default OrderFeedList;
