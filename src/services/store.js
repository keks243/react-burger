import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from './ingredients/reducers';
import constructorReduser from './constructor/reducers';



const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientsСonstructor: constructorReduser
})

export const store = configureStore({
    reducer: rootReducer,
})