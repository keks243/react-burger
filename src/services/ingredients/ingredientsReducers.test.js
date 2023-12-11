import reducer, { initialState } from './reducers';
import {
  GET_INGREDIENTS__REQUEST,
  GET_INGREDIENTS__SUCCESS,
  GET_INGREDIENTS__FAILURE,
  GET_SELECT_INGREDIENT,
} from './actions';

describe('Reducer', () => {
  it('should handle GET_INGREDIENTS__REQUEST', () => {
    const state = { ...initialState, isLoading: false };
    const action = { type: GET_INGREDIENTS__REQUEST };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle GET_INGREDIENTS__SUCCESS', () => {
    const state = { ...initialState, isLoading: true, ingredients: [] };
    const action = { type: GET_INGREDIENTS__SUCCESS, payload: [{ _id: '1', uniqId: 'u1', type: 'ingredient', name: 'Ingredient 1', image: 'image1', price: 10 }] };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].uniqId).toBe('u1');
  });

  it('should handle GET_INGREDIENTS__FAILURE', () => {
    const state = { ...initialState, isLoading: true, ingredients: [{ _id: '1', uniqId: 'u1', type: 'ingredient', name: 'Ingredient 1', image: 'image1', price: 10 }] };
    const action = { type: GET_INGREDIENTS__FAILURE };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should handle GET_SELECT_INGREDIENT', () => {
    const state = { ...initialState, selectIngredient: [] };
    const action = { type: GET_SELECT_INGREDIENT, payload: [{ _id: '1', uniqId: 'u1', type: 'ingredient', name: 'Ingredient 1', image: 'image1', price: 10 }] };
    const newState = reducer(state, action);
    expect(newState.selectIngredient).toHaveLength(1);
    expect(newState.selectIngredient[0].uniqId).toBe('u1');
  });

  it('should handle unknown action type', () => {
    const state = { ...initialState, isLoading: true };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
