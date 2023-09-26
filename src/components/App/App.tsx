import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
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
