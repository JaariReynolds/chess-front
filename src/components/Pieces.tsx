import { useEffect, useRef, useState } from "react";
import { useChessContext } from "../contexts/chessContext";
import { Piece, Square } from "../types/gameboard";
import { arePiecesEqual } from "../functions/objectEquality";
import getChessIcon from "../functions/getChessIcon";
import "./piece-component.css";
import MovingPiece from "./MovingPiece";
import { playMoveAudio, playActionAudio } from "../functions/playAudio";
import { PIECE_SIZE_MULTIPLIER, TRANSITION_LENGTH_MILLISECONDS } from "../constants";
import isSinglePieceAction from "../functions/isSinglePieceAction";
import handleCastleMovedPieces from "../functions/handleCastleMovedPieces";
import handleSingleMovedPiece from "../functions/handleSingleMovedPiece";

export interface MovedPiece {
  piece: Piece;
  newSquare: Square;
}

export default function Pieces() {
  const { gameboard, resetTrigger } = useChessContext();

  const [unmovedPieces, setUnmovedPieces] = useState<(Piece | null)[][]>([]);
  const [movedPieces, setMovedPieces] = useState<(MovedPiece | null)[]>([]);

  const isInitialRender = unmovedPieces.every((row) => row.every((piece) => piece === null));

  const [pieceWidth, setPieceWidth] = useState<number>(0);
  const pieceContainerRef = useRef<HTMLDivElement>(null);

  // updates piece width on window resize
  useEffect(() => {
    const updateWidth = () => {
      if (pieceContainerRef.current) {
        setPieceWidth(pieceContainerRef.current.offsetWidth / 8);
      }
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    setUnmovedPieces(gameboard.board);
    setMovedPieces([]);
    playMoveAudio();
  }, [resetTrigger, gameboard.board]);

  useEffect(() => {
    if (isInitialRender || gameboard.lastPerformedAction == null) return;

    const action = gameboard.lastPerformedAction;
    playActionAudio(action.algebraicNotation);

    // temp variable as this needs to be read later as well
    let tempMovedPieces: (MovedPiece | null)[];

    // get the piece/pieces that HAVE moved
    if (isSinglePieceAction(action)) {
      // convert the Action object to a MovedPiece object
      tempMovedPieces = handleSingleMovedPiece(action);
      setMovedPieces(tempMovedPieces);
    } else {
      // converts the involved pieces (castles only) to MovedPiece objects
      tempMovedPieces = handleCastleMovedPieces(unmovedPieces, action);
      setMovedPieces(tempMovedPieces);
    }

    // get the pieces that HAVENT moved
    const tempNewUnmoved = unmovedPieces.map((row) =>
      row.map((piece) => {
        if (piece == null) return null;
        else if (arePiecesEqual(piece, gameboard.board[piece.square.x][piece.square.y]))
          return piece; // should only return the piece if it equals what's currently in the unmoved array
        else return null;
      })
    );
    setUnmovedPieces(tempNewUnmoved);

    // set ALL to Unmoved after the transition/animation is over
    setTimeout(() => {
      setUnmovedPieces([
        ...tempNewUnmoved,
        tempMovedPieces.map((movedPiece) => {
          if (movedPiece == null) return null;
          else {
            return { ...movedPiece.piece, square: movedPiece.newSquare, hasMoved: true } as Piece;
          }
        }),
      ]);

      setMovedPieces([]);
    }, TRANSITION_LENGTH_MILLISECONDS);
  }, [gameboard]);

  // render unmoved pieces separately from moved pieces, as moved pieces use transitions
  return (
    <div ref={pieceContainerRef} className="pieces-container">
      {unmovedPieces.map((row) =>
        row.map((piece) => {
          return (
            piece && (
              <div
                key={`${piece.name}-${piece.square.x}-${piece.square.y}`}
                className="piece"
                style={{
                  width: `${pieceWidth}px`,
                  fontSize: `${pieceWidth * PIECE_SIZE_MULTIPLIER}px`,
                  aspectRatio: 1,
                  transform: `translate(${piece.square.y * pieceWidth}px, ${
                    piece.square.x * pieceWidth
                  }px)`,
                }}
              >
                {getChessIcon(piece.name, piece.teamColour)}
              </div>
            )
          );
        })
      )}

      {movedPieces.map((movedPiece) => {
        return (
          movedPiece && (
            <MovingPiece
              key={`${movedPiece.piece.name}-${movedPiece.newSquare.x}-${movedPiece.newSquare.y}`}
              movedPiece={movedPiece}
              pieceWidth={pieceWidth}
            />
          )
        );
      })}
    </div>
  );
}
