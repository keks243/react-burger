import {
    DELETE_INGREDIENT,
    SORT_INGREDIENT,
    ADD_INGREDIENT,
    POST_ORDER__REQUEST,
    POST_ORDER__SUCCESS,
    POST_ORDER__FAILURE,
  } from './actions';
  
  export interface ConstructorIngredient {
    _id: string;
    uniqId: string;
    type: string;
    name: string;
    image: string;
    price: number;
  }
  
  export interface ConstructorState {
    constructorIngredients: ConstructorIngredient[];
    number: number | null;
    isLoading: boolean;
    error: boolean;
    openModal: boolean;
  }
  
  export const initialState: ConstructorState = {
    constructorIngredients: [],
    number: null,
    isLoading: false,
    error: false,
    openModal: false,
  };
  
  type ConstructorAction =
    | { type: typeof DELETE_INGREDIENT; payload: string }
    | { type: typeof SORT_INGREDIENT; payload: ConstructorIngredient[] }
    | { type: typeof ADD_INGREDIENT; payload: ConstructorIngredient }
    | { type: typeof POST_ORDER__REQUEST }
    | { type: typeof POST_ORDER__SUCCESS; payload: number }
    | { type: typeof POST_ORDER__FAILURE };
  
  const constructorReducer = (
    state: ConstructorState = initialState,
    action: ConstructorAction
  ): ConstructorState => {
    switch (action.type) {
      case DELETE_INGREDIENT: {
        const newConstructorState = state.constructorIngredients.filter(
          ({ uniqId }) => uniqId !== action.payload
        );
        return { ...state, constructorIngredients: newConstructorState };
      }
      case SORT_INGREDIENT: {
        return { ...state, constructorIngredients: action.payload };
      }
      case ADD_INGREDIENT: {
        let bun = [...state.constructorIngredients];
        let newArray = [...state.constructorIngredients, action.payload];
        for (let i = 0; i < bun.length; i++) {
          if (
            bun[i].type === action.payload.type &&
            action.payload.type === 'bun'
          ) {
            bun[i] = action.payload;
            newArray.splice(i, 1);
            break;
          }
        }
        return { ...state, constructorIngredients: newArray };
      }
      case POST_ORDER__REQUEST: {
        return { ...state, isLoading: true };
      }
      case POST_ORDER__SUCCESS: {
        return {
          ...state,
          number: action.payload,
          isLoading: false,
          openModal: true,
        };
      }
      case POST_ORDER__FAILURE: {
        return { ...state, number: null, isLoading: false };
      }
      default:
        return state;
    }
  };
  
  export default constructorReducer;
  