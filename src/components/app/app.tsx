import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { Route, Routes, useLocation, useNavigate} from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page.js";
import { RegisterPage } from "../../pages/register-page/register-page.js";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { getCookie } from "../../coockie";
import Modal from "../modal/modal";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { getUser } from "../../services/user-actions/actions";
import { MainPage } from "../../pages/main-page/main-page.js";
import AppHeader from "../app-header/app-header.js";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../hoocks/useModal";
import { getIngredients } from "../../services/ingredients/actions.js";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";

function App() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [previousPathname, setPreviousPathname] = useState('');
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  let accessToken = getCookie("token");
  
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  useEffect(() => {
    dispatch(getIngredients());
    if (accessToken) {
      dispatch(getUser());
      
    }
  }, [dispatch]);
  
  // @ts-ignore
  const ingredient = useSelector((state) => state.ingredients.ingredients);
  const [date, setDate] = useState({});
  useEffect(()=> {
      if (ingredient.length != 0) {
          // @ts-ignore
          setDate(ingredient.find(item => item._id === location.pathname.split('/')[2]))
      }
  }, [ingredient, location])

  const handleCloseModal = () => {
    navigate("/");
    closeModal();
  };

  useEffect(() => {
    openModal();
  }, [date]);



  useEffect(() => {
    
    console.log(previousPathname);
    
  }, [previousPathname]);

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <Routes location={state?.backgroundLocation || location}>
          <Route
            path="/"
            element={ 
              <MainPage />
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
              <ProtectedRouteElement onlyReset onlyUnAuth>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route path={`ingredients/:id`} element={<IngredientPage />} />
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path='ingredients/:id'
              element={
                <div>
                  {date != undefined && (
                    <>
                      {isModalOpen && (
                        // @ts-ignore
                        <Modal
                          setActive={handleCloseModal}
                          // @ts-ignore
                          title="Детали ингредиента"
                        >
                          <IngredientDetails item={date} />
                        </Modal>
                      )}
                    </>
                  )}
                </div>
              }
            />
          </Routes>
        )}
      </main>
    </section>
  );
}

export default App;
