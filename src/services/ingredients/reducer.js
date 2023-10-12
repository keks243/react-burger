import {
    GET_INGREDIENTS__REQUEST,
    GET_INGREDIENTS__SUCCESS,
    GET_INGREDIENTS__FAILURE,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    GET_SELECT_INGREDIENT,
    SORT_INGREDIENT,
    
    
} from './actions';

const initialState = {
    ingredients: [],
    isLoading: false,
    error: null,
    constructorIngredients: [],
    ingredient:'',
    constructorIngredients: [],
    orderIngredients: '',
    isLoadingOrderIngredients: false,
    errorOrderIngredients: false,

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
            let bun = [...state.constructorIngredients]
            let newArray = [...state.constructorIngredients, action.payload]
            for (let i = 0; i < bun.length; i++) {
                if (bun[i].type === action.payload.type && action.payload.type === 'bun') {
                    bun[i] = action.payload
                    newArray.splice(i, 1)
                    break
                }
            }
            return {...state, constructorIngredients: newArray}
        }
        case DELETE_INGREDIENT: {
            const newConstructorState = state.constructorIngredients.filter(({ uniqId }) => uniqId !== action.payload)
            return {...state, constructorIngredients: newConstructorState}
        }
        case GET_SELECT_INGREDIENT: {
            return {...state, ingredient: action.payload}
        }
        case SORT_INGREDIENT: {
            return {...state, constructorIngredients: action.payload}
        }
        case GET_SELECT_INGREDIENT: {
            return {...state, selectIngredient: action.payload}
        }
        default:
            return state
        
    }
} 