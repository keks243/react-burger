import { orderLineReducer, orderLineInitialState, WebSocketStatus } from './reducers';
import {
  wsOrderLineConnecting,
  wsOrderLineOpen,
  wsOrderLineClose,
  wsOrderLineError,
  wsOrderLineMessage,
} from './actions';

describe('Order Line Reducer', () => {
  it('should handle wsOrderLineConnecting', () => {
    const state = { ...orderLineInitialState, status: WebSocketStatus.OFFLINE };
    const action = wsOrderLineConnecting();
    const newState = orderLineReducer(state, action);
    expect(newState.status).toBe(WebSocketStatus.CONNECTING);
  });

  it('should handle wsOrderLineOpen', () => {
    const state = { ...orderLineInitialState, status: WebSocketStatus.CONNECTING };
    const action = wsOrderLineOpen();
    const newState = orderLineReducer(state, action);
    expect(newState.status).toBe(WebSocketStatus.ONLINE);
    expect(newState.error).toBe('');
  });

  it('should handle wsOrderLineClose', () => {
    const state = { ...orderLineInitialState, status: WebSocketStatus.ONLINE };
    const action = wsOrderLineClose();
    const newState = orderLineReducer(state, action);
    expect(newState.status).toBe(WebSocketStatus.OFFLINE);
  });

  it('should handle wsOrderLineError', () => {
    const state = { ...orderLineInitialState, status: WebSocketStatus.ONLINE };
    const mockError = 'Connection error';
    const action = wsOrderLineError(mockError);
    const newState = orderLineReducer(state, action);
    expect(newState.status).toBe(WebSocketStatus.OFFLINE);
    expect(newState.error).toBe(mockError);
  });

  it('should handle wsOrderLineMessage', () => {
    const state = { ...orderLineInitialState };
    const mockOrderLineData = {
      success: true,
      orders: [{ id: 1, name: 'Order 1' }],
      total: 1,
      totalToday: 1,
    };
    const action = wsOrderLineMessage(mockOrderLineData);
    const newState = orderLineReducer(state, action);
    expect(newState.orderLineData).toEqual(mockOrderLineData);
  });
});
