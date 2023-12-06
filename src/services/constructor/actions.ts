import { nanoid } from "nanoid";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store"; 
import { request } from "../../request";
import {getCookie} from "../../coockie";
import { IngredientTypes } from '../types/ingredient-types'


export const POST_ORDER__REQUEST:'POST_ORDER__REQUEST' = 'POST_ORDER__REQUEST';
export const POST_ORDER__SUCCESS:'POST_ORDER__SUCCESS' = 'POST_ORDER__SUCCESS';
export const POST_ORDER__FAILURE:'POST_ORDER__FAILURE' = 'POST_ORDER__FAILURE';

export const GET_SELECT_INGREDIENT:'GET_SELECT_INGREDIENT' = 'GET_SELECT_INGREDIENT';

export const SORT_INGREDIENT:'SORT_INGREDIENT' = 'SORT_INGREDIENT';
export const DELETE_INGREDIENT:'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const ADD_INGREDIENT:'ADD_INGREDIENT' = 'ADD_INGREDIENT';

export interface I_POST_ORDER__REQUEST_ACTION {
  readonly type: typeof POST_ORDER__REQUEST,
}

export interface I_POST_ORDER__SUCCESS_ACTION {
  readonly type: typeof POST_ORDER__SUCCESS,
  payload: number
}

export interface I_POST_ORDER__FAILURE_ACTION {
  readonly type: typeof POST_ORDER__FAILURE,
}

export interface I_DELETE_INGREDIENT_ACTION {
  readonly type: typeof DELETE_INGREDIENT,
  payload: string
}

export interface I_ADD_INGREDIENT_ACTION {
  readonly type: typeof ADD_INGREDIENT,
  payload: IngredientTypes
}



export type ConstructorActionTypes =
  | I_POST_ORDER__REQUEST_ACTION
  | I_POST_ORDER__SUCCESS_ACTION
  | I_POST_ORDER__FAILURE_ACTION
  | I_DELETE_INGREDIENT_ACTION
  | I_ADD_INGREDIENT_ACTION;

export const postOrderIngredients = (bodyPost: string[]): ThunkAction<void, RootState, unknown, ConstructorActionTypes> => (dispatch) => {
  dispatch({ type: POST_ORDER__REQUEST });

  request('/orders', {
    method: "POST",
    body: JSON.stringify({ ingredients: bodyPost }),
    headers: {
      "Authorization": `Bearer ${getCookie('token')}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      dispatch({ type: POST_ORDER__SUCCESS, payload: res.order.number });
    })
    .catch((err) => {
      dispatch({ type: POST_ORDER__FAILURE });
      console.error(err);
    });
};

export const deleteIngredient = (ingredientObj: IngredientTypes): ConstructorActionTypes => ({
  type: DELETE_INGREDIENT,
  payload: ingredientObj.uniqId,
});

export const addIngredient = (ingredientObj: IngredientTypes): ConstructorActionTypes => ({ type: ADD_INGREDIENT, payload: { ...ingredientObj, uniqId: nanoid() } });
