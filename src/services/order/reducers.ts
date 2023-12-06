import {
  GET_DETAILED_ORDER_ERROR,
  GET_DETAILED_ORDER_REQUEST,
  GET_DETAILED_ORDER_SUCCESS,
  TTodoActions,
} from "./actions";
import { IOrderData } from "../web-socket/actions";

interface IDetailedOrderState {
  isLoading: boolean;
  isError: boolean;
  order: IOrderData[];
}

const initialState: IDetailedOrderState = {
  isLoading: false,
  isError: false,
  order: [],
};

export default (state = initialState, action: TTodoActions) => {
  switch (action.type) {
    case GET_DETAILED_ORDER_REQUEST:
      return { ...state, order: [], isLoading: true, isError: false };
    case GET_DETAILED_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        isError: false,
      };
    case GET_DETAILED_ORDER_ERROR:
      return { ...state, order: [], isLoading: false, isError: true };
    default:
      return state;
  }
};
