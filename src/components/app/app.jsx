import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page.js";
import { RegisterPage } from "../../pages/register-page/register-page.js";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile-page/profile-page";


// import ProtectedRouteElement from "../protected-route-element/protected-route-element";
import { getCookie } from "../../coockie";
import { getUser } from "../../services/user-actions/actions";
import { MainPage } from "../../pages/main-page/main-page.js";
import AppHeader from "../app-header/app-header.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions.js";

function App() {
  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(getIngredients(URL));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getIngredients());
  //   if (accessToken) {
  //     dispatch(getUser());
  //   }
  // }, [dispatch]);

  let location = useLocation();
  let accessToken = getCookie("token");
  // let state = location.state as { backgroundLocation?: Location };
  const navigate = useNavigate();

  const ingredient = useSelector((state) => state.ingredients.ingredients);
  const [date, setDate] = useState({});
  useEffect(() => {
    if (ingredient.length > 0) {
      setDate(
        ingredient.find((item) => item._id === location.pathname.split("/")[2])
      );
    }
  }, [ingredient, location]);

 

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot" element={<ForgotPasswordPage />} />
          <Route path="reset" element={<ResetPasswordPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
