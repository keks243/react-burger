import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon, ListIcon, BurgerIcon, Padding} from '@ya.praktikum/react-developer-burger-ui-components'
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import './app-header.module.css';

function AppHeader() {
  return (

        <header className={styles.container }>
            <section className={styles.subContainer}>
                <a href='#' className={styles.buttonContainer}>
                    <BurgerIcon type="secondary" />
                    <span className="pl-2 text text_type_main-default text_color_inactive">Конструктор</span>
                </a>
                <a href='#' className={styles.buttonContainer}>
                    <ListIcon type="secondary" />
                    <span className=" pl-2 text text_type_main-default text_color_inactive">Лента заказов</span>
                </a> 
            </section>
            <Logo value="one" ></Logo>
            <section className={styles.subContainer}>
                <a href='#' className={styles.buttonContainer}>
                    <ProfileIcon type="secondary" />
                    <span className="pl-2 text text_type_main-default text_color_inactive">Личный кабинет</span>
                </a>
            </section>
            
        </header>   
    
    
  );
}

export default AppHeader;
