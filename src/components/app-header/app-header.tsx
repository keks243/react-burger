import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  ProfileIcon,
  ListIcon,
  BurgerIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import "./app-header.module.css";
import { NavLink, Link } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.container}>
      <section className={styles.subContainer}>
        <NavLink to="/" className={styles.buttonContainer}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`${
                  isActive ? styles.activeText : styles.text
                } pl-2 text text_type_main-default text_color_inactive`}
              >
                Конструктор
              </span>
            </>
          )}
        </NavLink>

        <NavLink to="123" className={styles.buttonContainer}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`${
                  isActive ? styles.activeText : styles.text
                } pl-2 text text_type_main-default text_color_inactive`}
              >
                Лента заказов
              </span>
            </>
          )}
        </NavLink>
      </section>
      <Link to="/">
        <Logo />
      </Link>

      <section className={styles.subContainer}>
        <NavLink to="profile" className={styles.buttonContainer}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? "primary" : "secondary"} />
              <span
                className={`${
                  isActive ? styles.activeText : styles.text
                } pl-2 text text_type_main-default text_color_inactive`}
              >
                Личный кабинет
              </span>
            </>
          )}
        </NavLink>
      </section>
    </header>
  );
}

export default AppHeader;
