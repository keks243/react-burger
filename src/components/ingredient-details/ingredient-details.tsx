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
  useEffect(() => {
    console.log(data);
    
  }, [])

  if (!data) {
    return <div>Loading...</div>;
  }else{
    console.log(data);
  }

  

  return (
    <section className={styles.container}>
      <img src={data.image} alt="dataImage" />
      <span id="modal-name" className={`text text_type_main-medium ${styles.item}`}>
        {data.name}
      </span>
      <section className={styles.downContainer}>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Каллории, ккал
          </span>
          <span id="modal-calories" className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span id="modal-proteins" className="text text_type_digits-default text_color_inactive">
            {data.proteins}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span id="modal-fat" className="text text_type_digits-default text_color_inactive">
            {data.fat}
          </span>
        </section>
        <section className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span id="modal-carbohydrates" className="text text_type_digits-default text_color_inactive">
            {data.carbohydrates}
          </span>
        </section>
      </section>
    </section>
  );
};

export default IngredientDetails;
