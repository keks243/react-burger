import constructorReducer, { initialState } from './reducers';
import {
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  ADD_INGREDIENT,
  POST_ORDER__REQUEST,
  POST_ORDER__SUCCESS,
  POST_ORDER__FAILURE,
} from './actions';

describe('Constructor Reducer', () => {
  it('should handle DELETE_INGREDIENT', () => {
    const state = {
      ...initialState,
      constructorIngredients: [
        { uniqId: '1', type: 'ingredient', name: 'Ingredient 1' },
        { uniqId: '2', type: 'ingredient', name: 'Ingredient 2' },
      ],
    };
    const action = { type: DELETE_INGREDIENT, payload: '1' };
    const newState = constructorReducer(state, action);
    expect(newState.constructorIngredients).toHaveLength(1);
    expect(newState.constructorIngredients[0].uniqId).toBe('2');
  });

  it('should handle SORT_INGREDIENT', () => {
    const state = { ...initialState };
    const action = { type: SORT_INGREDIENT, payload: [{ uniqId: '1', type: 'ingredient', name: 'Ingredient 1' }] };
    const newState = constructorReducer(state, action);
    expect(newState.constructorIngredients).toHaveLength(1);
    expect(newState.constructorIngredients[0].uniqId).toBe('1');
  });

  it('should handle ADD_INGREDIENT', () => {
    const state = {
      ...initialState,
      constructorIngredients: [
        { uniqId: '1', type: 'ingredient', name: 'Ingredient 1' },
      ],
    };
    const action = { type: ADD_INGREDIENT, payload: { uniqId: '2', type: 'ingredient', name: 'Ingredient 2' } };
    const newState = constructorReducer(state, action);
    expect(newState.constructorIngredients).toHaveLength(2);
    expect(newState.constructorIngredients[1].uniqId).toBe('2');
  });

  it('should handle POST_ORDER__REQUEST', () => {
    const state = { ...initialState, isLoading: false };
    const action = { type: POST_ORDER__REQUEST };
    const newState = constructorReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });

  it('should handle POST_ORDER__SUCCESS', () => {
    const state = { ...initialState, isLoading: true, openModal: false };
    const action = { type: POST_ORDER__SUCCESS, payload: 123 };
    const newState = constructorReducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.openModal).toBe(true);
    expect(newState.number).toBe(123);
  });

  it('should handle POST_ORDER__FAILURE', () => {
    const state = { ...initialState, isLoading: true, number: 123 };
    const action = { type: POST_ORDER__FAILURE };
    const newState = constructorReducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.number).toBe(null);
  });
});
