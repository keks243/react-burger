import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-details.module.css'
import done from '../../images/done.png'

const OredertDetails = () => {
    return (
        <section className={styles.container}>
            <h2 className={`text text_type_digits-large pt-9 ${styles.number}`}>034536</h2>
            <span className="text text_type_main-medium">идентификатор заказа</span>
            <img src={done}></img>
            <span className="text text_type_main-default">Ваш заказ начали готовить</span>
            <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
        </section>
    );
};

export default OredertDetails;