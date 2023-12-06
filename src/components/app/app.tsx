import React from "react";
import { useState, useEffect } from "react";
import styles from "./app.module.css";
import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import { LoginPage } from "../../pages/login-page/login-page";
import { RegisterPage } from "../../pages/register-page/register-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password";
import { ProfilePage } from "../../pages/profile-page/profile-page";
import { getCookie } from "../../coockie";
import Modal from "../modal/modal";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";
import { getUser } from "../../services/user-actions/actions";
import { MainPage } from "../../pages/main-page/main-page";
import AppHeader from "../app-header/app-header";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks-redux";
import { useModal } from "../../hooks/useModal";
import { getIngredients } from "../../services/ingredients/actions";
import { IngredientTypes } from "../../services/types/ingredient-types";
import IngredientPage from "../../pages/ingredient-page/ingredient-page";
import DetailedOrderPage from "../../pages/detailed-orders-page/detailed-orders-page";
import DetailedOrder from "../detailed-order/detailed-order";
import FeedPage from "../../pages/feed-page/feed-page";
import OrderPage from "../../pages/order-page/order-page";
import { getDetailedOrder } from "../../services/order/actions";

function App() {
  const { openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let accessToken = getCookie("token");
  const detailedOrder = useAppSelector((state) => state.detailedOrder.order);

  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  useEffect(() => {
    dispatch(getIngredients());
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  useEffect(() => {
    //не смог сделать через useParams поэтому использовал location
    if (location.pathname.split('/')[1] === "feed") {
        dispatch(getDetailedOrder(location.pathname.split('/')[2]))
    } else if (location.pathname.split('/')[2] === "orders") {
        dispatch(getDetailedOrder(location.pathname.split('/')[3]))
    }
}, [dispatch, location.pathname.split('/')[2], location.pathname.split('/')[3]]);

useEffect(() => {
  if (location.pathname.split('/')[1] === "feed") {
      openModal()
  } else if (location.pathname.split('/')[2] === "orders") {
      openModal()
  }
}, [location]);

const handleCloseModal = () => {
  if (location.pathname.split('/')[1] === "feed") {
      navigate('/feed')
      closeModal()
  } else if (location.pathname.split('/')[2] === "orders") {
      navigate('/profile/orders')
      closeModal()
  }
  else {
      navigate('/')
      closeModal()
  }
}

  const ingredient: IngredientTypes[] = useAppSelector(
    (state) => state.ingredients.ingredient
  );

  useEffect(() => {
    openModal();
  }, [ingredient]);

  return (
    <section className={styles.App}>
      <AppHeader />
      <main className={styles.appContainer}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<DetailedOrderPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="profile/orders"
            element={
              <ProtectedRouteElement>
                <OrderPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="profile/orders/:id"
            element={
              <ProtectedRouteElement>
                <DetailedOrderPage />
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
              path="ingredients/:id"
              element={
                <>
                  {ingredient != undefined && (
                    <>
                      <Modal
                        setActive={handleCloseModal}
                        title="Детали ингредиента"
                      >
                        <IngredientDetails />
                      </Modal>
                    </>
                  )}
                </>
              }
            />
            <Route
              path="feed/:id"
              element={
                <>
                  {detailedOrder !== undefined && (
                    <Modal title="" setActive={handleCloseModal}>
                      <DetailedOrder
                        numberOrder={detailedOrder[0]?.number}
                        statusOrder={detailedOrder[0]?.status}
                        name={detailedOrder[0]?.name}
                        numberPositionCenter={false}
                        ingredients={detailedOrder[0]?.ingredients}
                        date={detailedOrder[0]?.createdAt}
                      />
                    </Modal>
                  )}
                </>
              }
            />
            <Route
              path="profile/orders/:id"
              element={
                <>
                  {detailedOrder !== undefined && (
                    <Modal title="" setActive={handleCloseModal}>
                      <DetailedOrder
                        numberOrder={detailedOrder[0]?.number}
                        statusOrder={detailedOrder[0]?.status}
                        name={detailedOrder[0]?.name}
                        numberPositionCenter={false}
                        ingredients={detailedOrder[0]?.ingredients}
                        date={detailedOrder[0]?.createdAt}
                      />
                    </Modal>
                  )}
                </>
              }
            />
          </Routes>
        )}
      </main>
    </section>
  );
}

export default App;
