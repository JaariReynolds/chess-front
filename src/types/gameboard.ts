import { ActionType, CheckStatus, TeamColour } from "./literals";

export interface Square {
  x: number;
  y: number;
}

export interface Piece {
  name: string;
  square: Square;
  teamColour: TeamColour;
  pieceValue: number;
  hasMoved: boolean;
}

export interface Action {
  piece: Piece;
  square: Square;
  actionType: ActionType;
  promoteCapturePoints: number;
}

export interface Gameboard {
  board: Piece[][];
  currentTeamColour: TeamColour;
  previousActions: Action[];
  whitePoints: number;
  blackPoints: number;
  checkedTeamColour: CheckStatus;
  checkmateTeamColour: CheckStatus;
}

export interface AvailablePieceActions {
  piece: Piece;
  actions: Action[];
}

export interface AvailableTeamActions {
  actions: AvailablePieceActions[];
}
