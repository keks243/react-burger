import React, { useEffect, useState } from "react";
import styles from "./ingredient-details.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector} from "../../hooks/hooks-redux";
import { IngredientTypes } from '../../services/types/ingredient-types'


const IngredientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const ingredient = useAppSelector((state) => state.ingredients.ingredients);
  const [data, setData] = useState<IngredientTypes | undefined>(undefined);

  useEffect(() => {
    if (ingredient.length !== 0) {
      const foundIngredient = ingredient.find((item: IngredientTypes) => item._id === id);
      setData(foundIngredient);
    }
  }, [ingredient, location, id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.container}>
      <img src={data.image} alt="dataImage" />
      <span className={`text text_type_main-medium ${styles.item}`}>
        {data.name}
      </span>
      <section className={styles.downContainer}>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Каллории, ккал
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
      </section>
    </section>
  );
};

export default IngredientDetails;
