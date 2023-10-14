import {
    GET_INGREDIENTS__REQUEST,
    GET_INGREDIENTS__SUCCESS,
    GET_INGREDIENTS__FAILURE,
    GET_SELECT_INGREDIENT,
    
    
} from './actions';

export const initialState = {
    ingredients: [],
    isLoading: false,
    error: null,
    constructorIngredients: [],
    ingredient:'',
    orderIngredients: '',
    isLoadingOrderIngredients: false,
    errorOrderIngredients: false,

}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS__REQUEST: {
            return {...state, isLoading: true}
        }
        case GET_INGREDIENTS__SUCCESS: {
            return {...state, ingredients: action.payload, isLoading: false}
        }
        case GET_INGREDIENTS__FAILURE: {
            return {...state, ingredients: [], isLoading: false}
        }
        case GET_SELECT_INGREDIENT: {
            return {...state, ingredient: action.payload}
        }
        case GET_SELECT_INGREDIENT: {
            return {...state, selectIngredient: action.payload}
        }
        default:
            return state
        
    }
} 