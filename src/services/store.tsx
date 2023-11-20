import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients/reducers';
import constructorReduser from './constructor/reducers';
import usersReducer from './user-actions/reducers';


const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsСonstructor: constructorReduser,
    usersInfo: usersReducer
})

export const store = configureStore({
    reducer: rootReducer,
})