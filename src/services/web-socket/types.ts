export enum WebsocketStatus {
  CONNECTING = "CONNECTING...",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

import { IngredientTypes } from "../../services/types/ingredient-types";

export type Live = Array<IngredientTypes>;

export enum LiveActionType {
  DATA = "data",
  INSERT = "insert",
}

export type Data = {
  type: LiveActionType.DATA;
  data: Live;
};

export type Insert = {
  type: LiveActionType.INSERT;
  data: {
    rows: Array<IngredientTypes>;
    pos: number;
  };
};

export type LiveAction = Insert | Data;

export type LiveActions = Array<LiveAction>;
