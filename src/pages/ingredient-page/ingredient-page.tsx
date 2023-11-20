import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import styles from "./ingredient-page.module.css";

const IngredientPage = () => {
  return (
    <div>
      <div className={styles.container}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientPage;
