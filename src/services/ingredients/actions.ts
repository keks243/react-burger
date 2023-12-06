import { request } from "../../request";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { IngredientTypes } from '../types/ingredient-types'

export const GET_INGREDIENTS__REQUEST:'GET_INGREDIENTS__REQUEST' = "GET_INGREDIENTS__REQUEST" ;
export const GET_INGREDIENTS__SUCCESS:'GET_INGREDIENTS__SUCCESS' = "GET_INGREDIENTS__SUCCESS" ;
export const GET_INGREDIENTS__FAILURE:'GET_INGREDIENTS__FAILURE' = "GET_INGREDIENTS__FAILURE" ;

export const GET_SELECT_INGREDIENT:'GET_SELECT_INGREDIENT' = "GET_SELECT_INGREDIENT" ;

export interface I_GET_INGREDIENTS_REQUEST_ACTION {
  readonly type: typeof GET_INGREDIENTS__REQUEST,
}

export interface I_GET_INGREDIENTS_SUCCESS_ACTION {
  readonly type: typeof GET_INGREDIENTS__SUCCESS,
  payload: IngredientTypes[]
}

export interface I_GET_INGREDIENTS_ERROR_ACTION {
  readonly type: typeof GET_INGREDIENTS__FAILURE,
}


export type IngredientsActionTypes =
  | I_GET_INGREDIENTS_REQUEST_ACTION
  | I_GET_INGREDIENTS_SUCCESS_ACTION
  | I_GET_INGREDIENTS_ERROR_ACTION;

export const getIngredients = (): ThunkAction<
  void,
  RootState,
  unknown,
  IngredientsActionTypes
> => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS__REQUEST });
  request("/ingredients")
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: res.data });
    })
    .catch(() => dispatch({ type: GET_INGREDIENTS__FAILURE }));
};
