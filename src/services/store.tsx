import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducers";
import constructorReducer from "./constructor/reducers";
import usersReducer from "./user-actions/reducers";
import { orderLineReducer } from "./web-socket/reducers";
import orderReducer from "../services/order/reducers";
import { socketMiddleware } from "./middleware/socket-middleware";
import { wsActions } from "./web-socket/actions";

const rootReducer: {} = combineReducers({
  ingredients: ingredientsReducer,
  ingredientsСonstructor: constructorReducer,
  usersInfo: usersReducer,
  detailedOrder: orderReducer,
  orderLineDate: orderLineReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
