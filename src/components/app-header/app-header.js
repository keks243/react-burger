import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
  Padding,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Typography } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import "./app-header.module.css";
import { NavLink } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.container}>
      <section className={styles.subContainer}>

        <NavLink
          to={{ pathname: `/` }}
          className={styles.buttonContainer}
          activeClassName={styles.activeButtonContainer}
        >
          <BurgerIcon type="secondary" />
          <span className="pl-2 text text_type_main-default text_color_inactive">
            Конструктор
          </span>
        </NavLink>

        <a href="#" className={styles.buttonContainer}>
          <ListIcon type="secondary" />
          <span className=" pl-2 text text_type_main-default text_color_inactive">
            Лента заказов
          </span>
        </a>
      </section>
      <Logo value="one"></Logo>
      <section className={styles.subContainer}>
        <a href="#" className={styles.buttonContainer}>
          <ProfileIcon type="secondary" />
          <span className="pl-2 text text_type_main-default text_color_inactive">
            Личный кабинет
          </span>
        </a>
      </section>
    </header>
  );
}

export default AppHeader;
