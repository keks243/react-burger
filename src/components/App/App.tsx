import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import data from '../../data'

function App() {
  return (
    <section className="App">    
      <AppHeader/>
     <main className='appContainer'>
      <BurgerIngredients data={data}/>
      <BurgerConstructor data={data}/>
     </main>
    </section>
  );
}



export default App;
