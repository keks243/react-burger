import styles from './main-page.module.css';
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";

export function MainPage() {
  return (
    <div className={styles.container}>
        <BurgerIngredients />

        <BurgerConstructor />
    </div>
  );
} 

export default MainPage;