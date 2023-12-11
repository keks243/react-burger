import userReducer, { initialState } from './reducers';
import {
  POST_REGISTER_USER_REQUEST,
  POST_REGISTER_USER_SUCCESS,
  POST_REGISTER_USER_ERROR,
} from './actions';

describe('User Reducer', () => {
  it('should handle POST_REGISTER_USER_REQUEST', () => {
    const state = { ...initialState, isPostRegisterLoading: false };
    const action = { type: POST_REGISTER_USER_REQUEST };
    const newState = userReducer(state, action);
    expect(newState.isPostRegisterLoading).toBe(true);
    expect(newState.isPostRegisterError).toBe(false);
  });

  it('should handle POST_REGISTER_USER_SUCCESS', () => {
    const state = { ...initialState, isPostRegisterLoading: true, isPostRegisterError: false, user: [] };
    const mockUserData = [{ id: 1, name: 'Test User', email: 'test@example.com' }];
    const action = { type: POST_REGISTER_USER_SUCCESS, payload: mockUserData };
    const newState = userReducer(state, action);
    expect(newState.isPostRegisterLoading).toBe(false);
    expect(newState.isPostRegisterError).toBe(false);
    expect(newState.user).toEqual(mockUserData);
  });

  it('should handle POST_REGISTER_USER_ERROR', () => {
    const state = { ...initialState, isPostRegisterLoading: true, isPostRegisterError: false, user: [] };
    const action = { type: POST_REGISTER_USER_ERROR };
    const newState = userReducer(state, action);
    expect(newState.isPostRegisterLoading).toBe(false);
    expect(newState.isPostRegisterError).toBe(true);
    expect(newState.user).toHaveLength(0);
  });

  it('should handle unknown action type', () => {
    const state = { ...initialState, isPostRegisterLoading: true };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = userReducer(state, action);
    expect(newState).toEqual(state);
  });
});
