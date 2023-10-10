export const GET_INGREDIENTS__REQUEST = 'GET_INGREDIENTS__REQUEST';
export const GET_INGREDIENTS__SUCCESS = 'GET_INGREDIENTS__SUCCESS';
export const GET_INGREDIENTS__FAILURE = 'GET_INGREDIENTS__FAILURE';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const addIngredient = (ingredientObj) => ({ type: ADD_INGREDIENT, payload: { ...ingredientObj} })
export const deleteIngredient = (ingredientObj) => ({ type: DELETE_INGREDIENT, payload: ingredientObj.uniqId })