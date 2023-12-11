import reducer, { initialState } from './reducers';
import {
  GET_DETAILED_ORDER_REQUEST,
  GET_DETAILED_ORDER_SUCCESS,
  GET_DETAILED_ORDER_ERROR,
} from './actions';

describe('Reducer', () => {
  it('should handle GET_DETAILED_ORDER_REQUEST', () => {
    const state = { ...initialState, isLoading: false };
    const action = { type: GET_DETAILED_ORDER_REQUEST };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.order).toHaveLength(0);
  });

  it('should handle GET_DETAILED_ORDER_SUCCESS', () => {
    const state = { ...initialState, isLoading: true, isError: false, order: [] };
    const mockOrderData = [{}];
    const action = { type: GET_DETAILED_ORDER_SUCCESS, payload: mockOrderData };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.order).toEqual(mockOrderData);
  });

  it('should handle GET_DETAILED_ORDER_ERROR', () => {
    const state = { ...initialState, isLoading: true, isError: false, order: [] };
    const action = { type: GET_DETAILED_ORDER_ERROR };
    const newState = reducer(state, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.order).toHaveLength(0);
  });

  it('should handle unknown action type', () => {
    const state = { ...initialState, isLoading: true };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = reducer(state, action);
    expect(newState).toEqual(state);
  });
});
