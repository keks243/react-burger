import {
    DELETE_INGREDIENT,
    SORT_INGREDIENT,
    ADD_INGREDIENT,
    POST_ORDER__REQUEST,
    POST_ORDER__SUCCESS,
    POST_ORDER__AILURE
    
    
} from './actions.js';

export const initialState = {
    constructorIngredients: [],
    number: [],
    isLoading: false,
    error: null,
    openModal: false
    
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {
        case DELETE_INGREDIENT: {
            const newConstructorState = state.constructorIngredients.filter(({ uniqId }) => uniqId !== action.payload)
            return {...state, constructorIngredients: newConstructorState}
        }
        case SORT_INGREDIENT: {
            return {...state, constructorIngredients: action.payload}
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
        case POST_ORDER__REQUEST: {
            return {...state, isLoading: true}
        }
        case POST_ORDER__SUCCESS: {
            return {...state, number: action.payload, isLoading: false, openModal:true}
        }
        case POST_ORDER__AILURE: {
            return {...state, number: [], isLoading: false}
        }
        
        default:
            return state
        
    }
} 