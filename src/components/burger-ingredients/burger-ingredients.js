import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../Card/Card';


function BurgerIngredients({data}) {
    const [current, setCurrent] = React.useState('Булки')

    const types = ['bun' , 'main', 'sauce']
    const typesRu = ['Булки' , 'Соусы', 'Начинки']

    // .find((e) => e.price == types[indexBlocks])

  return (
   
         
    <section className={styles.container }>
        <h1 className="text text_type_main-large" style={{textAlign: 'start'}}>Соберите бургер</h1>
        <section className={styles.tabs}>
            {types.map((item, index) => (
                <Tab key={index} active={current === item} value={item} onClick={setCurrent}>
                    {typesRu[index]}
                </Tab>
            ))}
            
        </section>
        <section className={`custom-scroll ${styles.itemsContainer}`}>
            {types.map((block, indexBlocks) => 
             <section key={indexBlocks} className={styles.itemContainer}>
                <h2 className="text text_type_main-medium" style={{textAlign: 'start'}}>{typesRu[indexBlocks]}</h2> 
                <section className={styles.itemSubContainer}>
                    {data.filter(ingredient => ingredient.type == block).map((item, indexItems) => 
                        <Card key={indexItems} item={item} /> 
                    )}
                </section>
            </section>
            )}
           
        </section>
    </section>   
    
    
  );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array.isRequired
};

export default BurgerIngredients;
