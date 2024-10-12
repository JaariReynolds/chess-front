import { useEffect, useState } from "react";
import { useChessContext } from "../contexts/chessContext";
import { Piece, Square } from "../types/gameboard";
import { arePiecesEqual } from "../functions/objectEquality";
import getChessIcon from "../functions/getChessIcon";
import "./piece-component.css";
import MovingPiece from "./MovingPiece";
import isPawnPromoteAction from "../functions/isPawnPromoteAction";
import getPromotionPieceName from "../functions/getPromotionPieceName";
import getPiecevalueFromName from "../functions/getPieceValueFromName";
import { playMoveAudio, playActionAudio } from "../functions/playAudio";

export interface MovedPiece {
  piece: Piece;
  newSquare: Square;
}

export default function Pieces() {
  const { gameboard, selectedAction, resetTrigger, userActionPerformed } = useChessContext();
  const [unmovedPieces, setUnmovedPieces] = useState<(Piece | null)[][]>([]);

  const [movedPieces, setMovedPieces] = useState<(MovedPiece | null)[]>([]);

  const isInitialRender = unmovedPieces.every((row) => row.every((piece) => piece === null));

  const [pendingFrom, setPendingFrom] = useState<Piece[]>([]);
  const [pendingTo, setPendingTo] = useState<Piece[]>([]);

  useEffect(() => {
    setUnmovedPieces([]);
    playMoveAudio();
  }, [resetTrigger]);

  // when an action is selected,
  useEffect(() => {
    if (selectedAction == null) return;

    playActionAudio(selectedAction);

    if (selectedAction && isPawnPromoteAction(selectedAction)) {
      const newName = getPromotionPieceName(selectedAction.actionType)!;
      const basePiece = {
        ...selectedAction.piece,
        name: newName,
        pieceValue: getPiecevalueFromName(newName),
      } as Piece;

      setPendingFrom((prev) => [...prev, basePiece]);
      setPendingTo((prev) => [...prev, { ...basePiece, square: selectedAction.square }]);
    }
  }, [selectedAction]);

  useEffect(() => {
    if (
      gameboard.previousActions.length > 0 &&
      userActionPerformed == false &&
      isPawnPromoteAction(gameboard.previousActions[gameboard.previousActions.length - 1])
    ) {
      const previousBotPromoteAction =
        gameboard.previousActions[gameboard.previousActions.length - 1];

      const newName = getPromotionPieceName(previousBotPromoteAction.actionType)!;

      const basePiece = {
        ...previousBotPromoteAction.piece,
        name: newName,
        pieceValue: getPiecevalueFromName(newName),
        hasMoved: true,
      } as Piece;

      setPendingFrom((prev) => [...prev, basePiece]);
      setPendingTo((prev) => [...prev, { ...basePiece, square: previousBotPromoteAction.square }]);
    }
  }, [userActionPerformed]);

  useEffect(() => {
    const tempPendingFrom: Piece[] = [...pendingFrom];
    const tempPendingTo: Piece[] = [...pendingTo];

    const existingPieces = gameboard.board.map((row, rowIndex) =>
      row.map((updatedPiece, colIndex) => {
        if (isInitialRender) return updatedPiece;

        const existingPiece = unmovedPieces[rowIndex][colIndex];

        // if no change
        if (arePiecesEqual(existingPiece, updatedPiece)) return existingPiece;

        // if a piece has captured/replaced an existing piece,
        if (existingPiece && updatedPiece && !arePiecesEqual(existingPiece, updatedPiece)) {
          tempPendingTo.push(updatedPiece);
          return null;
        }

        // if piece has moved (from old square)
        if (existingPiece && updatedPiece == null) {
          tempPendingFrom.push(existingPiece);
          return null;
        }

        // if piece has moved (to new square)
        if (updatedPiece && existingPiece == null) {
          tempPendingTo.push(updatedPiece);
          return null;
        }

        return null;
      })
    );

    const movedPieces = tempPendingFrom.map((fromPiece) => {
      const matchingEnd = tempPendingTo.find(
        (toPiece) => toPiece.name == fromPiece.name && toPiece.teamColour == fromPiece.teamColour
      );
      if (matchingEnd != undefined) {
        return {
          piece: fromPiece,
          newSquare: matchingEnd.square,
        } as MovedPiece;
      }

      return null;
    });

    setMovedPieces(movedPieces);
    setUnmovedPieces(existingPieces);
  }, [gameboard.board, pendingFrom, pendingTo]);

  useEffect(() => {
    if (movedPieces.length == 0) return;
    setTimeout(() => {
      const newStaticPieces: (Piece | null)[][] = unmovedPieces;

      movedPieces.forEach((movedPiece) => {
        if (movedPiece) {
          newStaticPieces[movedPiece.newSquare.x][movedPiece.newSquare.y] = {
            ...movedPiece.piece,
            square: movedPiece.newSquare,
            hasMoved: true,
          } as Piece;
        }
      });

      setUnmovedPieces(newStaticPieces);
      setMovedPieces([]);
      setPendingFrom([]);
      setPendingTo([]);
    }, 250);
  }, [movedPieces, unmovedPieces]);

  return (
    <div
      style={{
        width: "1000px",
        height: "1000px",
        position: "absolute",
        left: 0,
        top: 0,
        pointerEvents: "none",
      }}
    >
      {unmovedPieces.map((row) =>
        row.map((piece) => {
          return (
            piece && (
              <div
                key={`${piece.name}-${piece.square.x}-${piece.square.y}`}
                className="piece"
                style={{
                  transform: `translate(${piece.square.y * (1000 / 8)}px, ${
                    piece.square.x * (1000 / 8)
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
            />
          )
        );
      })}
    </div>
  );
}
