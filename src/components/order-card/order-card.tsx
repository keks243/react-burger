import styles from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../hooks/hooks-redux";
import { Link, useLocation } from "react-router-dom";
import { IngredientTypes } from "../../services/types/ingredient-types";

interface IOrderCardProps {
  ingredient: {}[];
  date: string;
  numberOrder: number;
  name: string;
  visibleStatus?: boolean;
  status: string;
}

const OrderCard = ({
  ingredient,
  date,
  numberOrder,
  name,
  visibleStatus = false,
  status,
}: IOrderCardProps) => {
  const ingredientStore: IngredientTypes[] = useAppSelector(
    (state) => state.ingredients.ingredients
  );
  const ingredientsImage: string[] = [];
  let allIngredientPrice: number = 0;
  const location = useLocation();

  ingredient.forEach((ingredientId) => {
    const foundIngredient = ingredientStore.find((ingredient) => {
      return ingredient._id === ingredientId;
    });
    if (foundIngredient) {
      allIngredientPrice += foundIngredient.price;
      ingredientsImage.push(foundIngredient.image_mobile);
    }
  });

  return (
    <Link
      to={`${numberOrder}`}
      state={{ backgroundLocation: location }}
      className={styles.cardOrderContainer}
    >
      <section className={styles.numberOrderDateContainer}>
        <span className={styles.numberOrder}>#{numberOrder}</span>
        <FormattedDate date={new Date(date)} />
      </section>
      <h3 className={styles.name}>{name}</h3>
      {visibleStatus && (
        <span className={styles.statusOrder}>
          {status === "done"
            ? "Выполнен"
            : status === "pending"
            ? "В работе"
            : "Создан"}
        </span>
      )}
      <section className={styles.bodyContainer}>
        <div className={styles.circlesContainer}>
          {ingredientsImage.map((item, index) => (
            <>
              {index < 6 && (
                <section
                  className={styles.imageContainer}
                  style={{
                    zIndex: ingredientsImage.length - index,
                    left: index * -20,
                    backgroundImage: `url(${item})`,
                  }}
                >
                  {index === 5 && (
                    <section className={styles.circle}>
                      {ingredientsImage.length - index !== 0 && (
                        <span>+{ingredientsImage.length - index}</span>
                      )}
                    </section>
                  )}
                </section>
              )}
            </>
          ))}
        </div>

        <div className={styles.priceContainer}>
          <span className={styles.price}>{allIngredientPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </section>
    </Link>
  );
};

export default OrderCard;
