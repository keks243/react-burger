import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-constructor.module.css';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructor ({data}) {

let sum = 0
for (let index = 0; index < data.length; index++) {
    sum += data[index].price;
    
}
    return(
        <section className={styles.container}>
           <section className={styles.subContainer}>
            <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={data[0].image}
                />
                <section className={`custom-scroll ${styles.ingredients}`}>
                    {data.filter(ingredient => ingredient.type !== 'bun').map((item, index) => (
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                            key={index}
                        />
                    ))}
                </section>        
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={data[0].image}
                />
            </section>
            <section className={styles.bottomContainer}>
                <section className={styles.price}>
                    <span className="text text_type_digits-medium">{sum}</span>
                    <CurrencyIcon type="primary" />
                </section>
                
                <Button htmlType="button" type="primary" size="medium">
                    Оформить заказ
                </Button>
            </section>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerConstructor;