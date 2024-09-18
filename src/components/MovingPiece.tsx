import { useState } from "react";
import { MovedPiece } from "./Pieces";
import getChessIcon from "../functions/getChessIcon";

export default function MovingPiece({ movedPiece }: { movedPiece: MovedPiece }) {
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `translate(${movedPiece.piece.square.y * (1000 / 8)}px, ${
      movedPiece.piece.square.x * (1000 / 8)
    }px)`,
  });

  setTimeout(() => {
    setStyle({
      transform: `translate(${movedPiece.newSquare.y * (1000 / 8)}px, ${
        movedPiece.newSquare.x * (1000 / 8)
      }px)`,
    });
  }, 10);

  return (
    <div
      className="piece"
      style={{ ...style, transition: "transform 0.4s cubic-bezier(.24,.82,.22,.97)" }}
    >
      {getChessIcon(movedPiece.piece.name, movedPiece.piece.teamColour)}
    </div>
  );
}
