import { ActionType, PieceName, TeamColour } from "./literals";

export interface Square {
  x: number;
  y: number;
}

export interface Piece {
  name: PieceName;
  square: Square;
  teamColour: TeamColour;
  pieceValue: number;
  hasMoved: boolean;
}

export interface Action {
  piece: Piece;
  algebraicNotation: string;
  square: Square;
  actionType: ActionType;
  promoteCapturePoints: number;
}

export interface Gameboard {
  board: Piece[][];
  currentTeamColour: TeamColour;
  previousActions: string[];
  lastPerformedAction: Action | null;
  whitePoints: number;
  blackPoints: number;
  checkTeamColour: TeamColour | null;
  checkmateTeamColour: TeamColour | null;
  isStalemate: boolean;
  isGameOver: boolean;
}

export interface AvailablePieceActions {
  piece: Piece;
  actions: Action[];
}
