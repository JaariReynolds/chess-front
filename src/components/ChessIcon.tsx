import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
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

interface ChessIconProps {
  pieceName: PieceName;
  teamColour: TeamColour;
}

export default function ChessIcon({ pieceName, teamColour }: ChessIconProps): JSX.Element {
  const { userTeamColour } = useChessContext();
  const icon = iconMap[pieceName];
  return (
    <FontAwesomeIcon
      icon={icon}
      color={teamColour}
      className={userTeamColour == "White" ? "" : "rotated"}
    />
  );
}
