import { useState } from "react";
import { MovedPiece } from "./Pieces";
import getChessIcon from "../functions/getChessIcon";

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
      className="piece"
      style={{
        ...style,
        transition: "transform 0.25s cubic-bezier(.24,.82,.22,.97)",
        width: `${pieceWidth}px`,
        aspectRatio: 1 / 1,
      }}
    >
      {getChessIcon(movedPiece.piece.name, movedPiece.piece.teamColour)}
    </div>
  );
}
