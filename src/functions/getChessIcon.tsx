import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PieceName, TeamColour } from "../types/literals";
import {
  faChessBishop,
  faChessKing,
  faChessKnight,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  Pawn: faChessPawn,
  Bishop: faChessBishop,
  Knight: faChessKnight,
  Rook: faChessRook,
  Queen: faChessQueen,
  King: faChessKing,
};

export default function getChessIcon(pieceName: PieceName, teamColour: TeamColour): JSX.Element {
  const icon = iconMap[pieceName];
  return <FontAwesomeIcon icon={icon} color={teamColour} />;
}
