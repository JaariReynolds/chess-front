import { useState } from "react";
import { MovedPiece } from "./Pieces";
import getChessIcon from "../functions/getChessIcon";
import { MOVING_SIZE_MULTIPLIER } from "../constants";
import "./piece-component.css";

interface MovingPieceProps {
  movedPiece: MovedPiece;
  pieceWidth: number;
}

export default function MovingPiece({ movedPiece, pieceWidth }: MovingPieceProps) {
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `translate(${movedPiece.piece.square.y * pieceWidth}px, ${
      movedPiece.piece.square.x * pieceWidth
    }px)`,
  });

  setTimeout(() => {
    setStyle({
      transform: `translate(${movedPiece.newSquare.y * pieceWidth}px, ${
        movedPiece.newSquare.x * pieceWidth
      }px)`,
    });
  }, 10);

  return (
    <div
      className="piece moving-piece"
      style={{
        ...style,
        width: `${pieceWidth}px`,
        fontSize: `${pieceWidth * MOVING_SIZE_MULTIPLIER}px`,
      }}
    >
      {getChessIcon(movedPiece.piece.name, movedPiece.piece.teamColour)}
    </div>
  );
}
