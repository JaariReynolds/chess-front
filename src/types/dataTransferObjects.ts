import { Action, AvailablePieceActions, Gameboard } from "./gameboard";

export type DataTransferObject = {
  gameboard: Gameboard;
  actions: AvailablePieceActions[];
};

export type GameboardActionRequestObject = {
  gameboard: Gameboard;
  action: Action;
};
