import {
    GET_INGREDIENTS__REQUEST,
    GET_INGREDIENTS__SUCCESS,
    GET_INGREDIENTS__FAILURE,
    GET_SELECT_INGREDIENT,
  } from './actions';
  
  interface Ingredient {
    _id: string;
    uniqId: string;
    type: string;
    name: string;
    image: string;
    price: number;
  }
  
  interface State {
    ingredients: Ingredient[];
    isLoading: boolean;
    error: boolean; 
    constructorIngredients: Ingredient[];
    ingredient: string; 
    orderIngredients: string; 
    isLoadingOrderIngredients: boolean;
    errorOrderIngredients: boolean;
    selectIngredient: Ingredient[];
  }
  
  const initialState: State = {
    ingredients: [],
    isLoading: false,
    error: false,
    constructorIngredients: [],
    ingredient: '',
    orderIngredients: '',
    isLoadingOrderIngredients: false,
    errorOrderIngredients: false,
    selectIngredient: [], 
  };
  
  type Action =
    | { type: typeof GET_INGREDIENTS__REQUEST }
    | { type: typeof GET_INGREDIENTS__SUCCESS; payload: Ingredient[] }
    | { type: typeof GET_INGREDIENTS__FAILURE }
    | { type: typeof GET_SELECT_INGREDIENT; payload: Ingredient[] }; 
  
  const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case GET_INGREDIENTS__REQUEST: {
        return { ...state, isLoading: true };
      }
      case GET_INGREDIENTS__SUCCESS: {
        return { ...state, ingredients: action.payload, isLoading: false };
      }
      case GET_INGREDIENTS__FAILURE: {
        return { ...state, ingredients: [], isLoading: false };
      }
      
      case GET_SELECT_INGREDIENT: {
        return { ...state, selectIngredient: action.payload };
      }
      default:
        return state;
    }
  };
  
  export default reducer;
  