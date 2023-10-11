import {
    GET_INGREDIENTS__REQUEST,
    GET_INGREDIENTS__SUCCESS,
    GET_INGREDIENTS__FAILURE,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    GET_SELECT_INGREDIENT,
    
} from './actions'

const initialState ={
    ingredients: [],
    isLoading: false,
    error: null,
    constructorIngredients: [],
    ingredient:''
}

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
        case ADD_INGREDIENT: {
            return {...state, constructorIngredients: [...state.constructorIngredients, action.payload]}
        }
        case DELETE_INGREDIENT: {
            const newConstructorState = state.constructorIngredients.filter(({ uniqId }) => uniqId !== action.payload)
            return {...state, constructorIngredients: newConstructorState}
        }
        case GET_SELECT_INGREDIENT: {
            return {...state, ingredient: action.payload}
        }
        default:
            return state
        
    }
} 