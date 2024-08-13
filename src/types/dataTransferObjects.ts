import { Action, AvailableTeamActions, Gameboard } from "./gameboard";

export type DataTransferObject = {
  gameboard: Gameboard;
  actions: AvailableTeamActions;
};

export type GameboardActionRequestObject = {
  gameboard: Gameboard;
  action: Action;
};
