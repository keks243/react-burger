import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { LoginPage } from "../../pages/login-page/login-page.js";
import { RegisterPage } from "../../pages/register-page/register-page.js";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";


import { MainPage } from "../../pages/main-page/main-page.js";


import AppHeader from "../app-header/app-header.js";

import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions.js";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients(URL));
  }, [dispatch]);

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot" element={<ForgotPasswordPage />} />

        </Routes> 
      </main>   
       
        
    </section>
  );
}

export default App;
