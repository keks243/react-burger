import React from 'react';
import PropTypes from 'prop-types';
import styles from './card.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'


function Card ({item}) {

    return(
        <section className={styles.item}>
            <section className={styles.counter}>
                <Counter  count={1} size="default" extraClass="m-1" />
            </section>
           
            <img src={item.image} />
            <section className={styles.priceContainer}>
                <span className="text text_type_main-medium" >{item.price}</span>
                <CurrencyIcon type="primary" />
            </section>
            <span className="text text_type_main-default" >{item.name}</span>
        </section>
    )
}

Card.propTypes = {
    item: PropTypes.object.isRequired
};

export default Card;