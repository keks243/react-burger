import { nanoid } from "nanoid";
export const POST_ORDER__REQUEST = 'OST_ORDER__REQUEST';
export const POST_ORDER__SUCCESS = 'POST_ORDER__SUCCESS';
export const POST_ORDER__AILURE = 'POST_ORDER__AILURE';

export const GET_SELECT_INGREDIENT = 'GET_SELECT_INGREDIENT';


export const SORT_INGREDIENT = 'SORT_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';



export const postOrderIngredients = (bodyPost, URL) => (dispatch) => {
    dispatch({type: POST_ORDER__REQUEST})
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({ ingredients: bodyPost }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) =>
          res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
        )
        .then((res) => {
            dispatch({type: POST_ORDER__SUCCESS, payload: res.order.number})
        })
        
        .catch((err) => {
            dispatch({type: POST_ORDER__AILURE})
            console.error(err)
        });
}

export const deleteIngredient = (ingredientObj) => ({ type: DELETE_INGREDIENT, payload: ingredientObj.uniqId })
export const addIngredient = (ingredientObj) => ({type: ADD_INGREDIENT, payload: {...ingredientObj, uniqId: nanoid()} })
