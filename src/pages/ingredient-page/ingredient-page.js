import React, { useEffect, useState } from "react";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./ingredient-page.module.css";

const IngredientPage = () => {
  const [date, setDate] = useState(null);
  const location = useLocation();
  const ingredient = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    if (ingredient.length > 0) {
      setDate(ingredient.find(item => item._id === location.pathname.split('/')[2]))
    }
  }, [ingredient, location]);

  return (
    <div>
      {date !== null && (
        <div className={styles.container}>
          <IngredientDetails item={date} />
        </div>
      )}
    </div>
  );
};

export default IngredientPage;
