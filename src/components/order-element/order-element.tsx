import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-element.module.css";

interface IDetailedOrder {
  image: string;
  price: number;
  name: string;
  count: number;
}

const DetailedOrderElement = ({
  image,
  price,
  name,
  count,
}: IDetailedOrder) => {
  return (
    <div className={styles.container}>
      <section className={styles.imageContainer}>
        <img src={image} alt="ingredientImage" />
      </section>
      <span className={styles.name}>{name}</span>
      <section className={styles.priceContainer}>
        <span>{count}</span>
        <span>x</span>
        <span>{count * price}</span>
        <CurrencyIcon type="primary" />
      </section>
    </div>
  );
};

export default DetailedOrderElement;
