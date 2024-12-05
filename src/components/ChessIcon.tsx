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

const colourMap = {
  White: "#FFFFF0", // ivory, matches var(--white-colour)
  Black: "#100C08", // smoky black, matches var(--black-colour)
};

interface ChessIconProps {
  pieceName: PieceName;
  teamColour: TeamColour;
}

export default function ChessIcon({ pieceName, teamColour }: ChessIconProps): JSX.Element {
  const { userTeamColour } = useChessContext();
  const icon = iconMap[pieceName];
  const colour = colourMap[teamColour];
  return (
    <FontAwesomeIcon
      icon={icon}
      color={colour}
      className={userTeamColour == "White" ? "" : "rotated"}
    />
  );
}
