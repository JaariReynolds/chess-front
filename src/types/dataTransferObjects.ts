import { AvailableTeamActions, Gameboard } from "./gameboard";

export interface DataTransferObject {
  gameboard: Gameboard;
  actions: AvailableTeamActions;
}
