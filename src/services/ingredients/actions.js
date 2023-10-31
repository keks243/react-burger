import { request } from "../../request";

export const GET_INGREDIENTS__REQUEST = "GET_INGREDIENTS__REQUEST";
export const GET_INGREDIENTS__SUCCESS = "GET_INGREDIENTS__SUCCESS";
export const GET_INGREDIENTS__FAILURE = "GET_INGREDIENTS__FAILURE";

export const GET_SELECT_INGREDIENT = "GET_SELECT_INGREDIENT";

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS__REQUEST });
  request("/ingredients")
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS__SUCCESS, payload: res.data });
    })
    .catch(() => dispatch({ type: GET_INGREDIENTS__FAILURE }));
};
