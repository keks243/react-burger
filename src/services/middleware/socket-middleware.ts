import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";

export type TWSActionTypes = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<any>;
};

export const socketMiddleware = (wsActions: TWSActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let reconnectionTimer: number = 0;
    let url: string = "";
    let isConnected: boolean = false;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsConnecting,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsDisconnect,
      } = wsActions;
      if (wsConnect.match(action)) {
        url = action.payload;
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnecting());
          dispatch(onOpen());
          isConnected = true;
        };

        socket.onerror = (event) => {
          dispatch(onError(event.type));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(onError(event.code.toString()));
          }
          dispatch(onClose());

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectionTimer = window.setTimeout(() => {
              dispatch(wsConnect(url));
            }, 3000);
          }
        };

        if (wsDisconnect.match(action)) {
          clearTimeout(reconnectionTimer);
          isConnected = false;
          reconnectionTimer = 0;
          socket.close();
          dispatch(onClose());
        }
      }

      next(action);
    };
  };
};
