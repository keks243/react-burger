import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page.js";
import { RegisterPage } from "../../pages/register-page/register-page.js";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { getCookie } from "../../coockie";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { getUser } from "../../services/user-actions/actions";
import { MainPage } from "../../pages/main-page/main-page.js";
import AppHeader from "../app-header/app-header.js";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions.js";

function App() {
  const [date, setDate] = useState({});
  const ingredient = useSelector((state) => state.ingredients.ingredient);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  let accessToken = getCookie("token");


  useEffect(() => {
    
    if (accessToken) {
      dispatch(getUser());
      dispatch(getIngredients());
    }
  }, [dispatch]);



  // let state = location.state as { backgroundLocation?: Location };

 
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
          <Route
            path="/"
            element={
              <ProtectedRouteElement>
                <MainPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <LoginPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <RegisterPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/forgot"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <ForgotPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="/password-reset"
            element={
              <ProtectedRouteElement onlyUnAuth>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />
        </Routes>
      </main>
    </section>
  );
}

export default App;
