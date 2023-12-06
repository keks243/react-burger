import styles from "./detailed-order.module.css";
import { FC } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderElement from "../order-element/order-element";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks-redux";
import { IngredientTypes } from "../../services/types/ingredient-types";

interface IDetailedOrderProps {
  numberPositionCenter?: boolean;
  name: string;
  date: string;
  numberOrder: number;
  statusOrder: string;
  ingredients: string[];
}

interface ICombinedIngredients {
  image: string[];
  count: number[];
}

const DetailedOrder: FC<IDetailedOrderProps> = ({
  numberPositionCenter = true,
  numberOrder,
  statusOrder,
  name,
  date,
  ingredients,
}: IDetailedOrderProps) => {

  const ingredientStore: IngredientTypes[] = useAppSelector(
    (state) => state.ingredients.ingredients
  );

  const ingredientsImage: string[] = [];
  const ingredientsNames: string[] = [];
  let allIngredientPrice: number = 0;
  const priceIngredient: number[] = [];

  if (ingredients !== undefined) {
    ingredients.forEach((ingredientId) => {
      const foundIngredient = ingredientStore.find(
        (ingredient) => ingredient._id === ingredientId
      );
      if (foundIngredient) {
        allIngredientPrice += foundIngredient.price;
        ingredientsImage.push(foundIngredient.image_mobile);
        priceIngredient.push(foundIngredient.price);
        ingredientsNames.push(foundIngredient.name);
      }
    });
  }

  function сombinedIngredients(order: string[]): ICombinedIngredients {
    const ingredientsCount: Record<string, number> = {};

    order.forEach((ingredient) => {
      ingredientsCount[ingredient] = (ingredientsCount[ingredient] || 0) + 1;
    });

    const image: string[] = [];
    const count: number[] = [];

    for (const ingredient in ingredientsCount) {
      image.push(ingredient);
      count.push(ingredientsCount[ingredient]);
    }

    return { image, count };
  }

  const result: ICombinedIngredients = сombinedIngredients(ingredientsImage);

  return (
    <div className={styles.DetailedOrderContainer}>
      <span
        className={`${styles.orderNumber} `}
        style={{ justifyContent: numberPositionCenter ? "center" : "start" }}
      >
        #{numberOrder}
      </span>

      <h2 className={``}>{name}</h2>

      <span className={styles.status}>
        {statusOrder === "done"
          ? "Выполнен"
          : statusOrder === "pending"
          ? "В работе"
          : "Создан"}
      </span>
      <div className={styles.elementContainer}>
        <h3>Состав:</h3>
        <section className={`custom-scroll pr-6 ${styles.elementSubContainer}`}>
          {result.image.map((item, index) => (
            <OrderElement
              image={item}
              price={priceIngredient[index]}
              name={ingredientsNames[index]}
              key={index}
              count={result.count[index]}
            />
          ))}
        </section>
      </div>

      <section className={styles.DatePriceContainer}>
        <FormattedDate date={new Date(date)} />
        <div className={styles.containerPrice}>
          <span>{allIngredientPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </div>
  );
};

export default DetailedOrder;
