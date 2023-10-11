import { nanoid } from "nanoid";

export const GET_INGREDIENTS__REQUEST = 'GET_INGREDIENTS__REQUEST';
export const GET_INGREDIENTS__SUCCESS = 'GET_INGREDIENTS__SUCCESS';
export const GET_INGREDIENTS__FAILURE = 'GET_INGREDIENTS__FAILURE';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export const GET_SELECT_INGREDIENT = 'GET_SELECT_INGREDIENT';

export const getIngredients = (URL) => (dispatch) =>{
  
    dispatch({type: GET_INGREDIENTS__REQUEST})
    fetch(URL)
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: res.data })
      // setData(res.data)
    })
    .catch(() => dispatch({type: GET_INGREDIENTS__FAILURE}));
}

export const addIngredient = (ingredientObj) => ({type: ADD_INGREDIENT, payload: {...ingredientObj, uniqId: nanoid()} })
export const deleteIngredient = (ingredientObj) => ({ type: DELETE_INGREDIENT, payload: ingredientObj.uniqId })