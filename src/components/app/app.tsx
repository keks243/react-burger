import React from 'react';
import logo from './logo.svg';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../data'

function App() {
  return (
    <section className={styles.App}>    
      <AppHeader/>
     <main className={styles.appContainer}>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
     </main>
    </section>
  );
}



export default App;
