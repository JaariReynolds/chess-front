import { ActionType } from "../types/literals";

export default function updateAlgebraicPromotionPiece(
  actionType: ActionType,
  algebraicBase: string
): string {
  if (algebraicBase.length == 0) {
    throw Error("Unable to update promotion letter on an empty move");
  }
  const equalsIndex = algebraicBase.indexOf("=");
  if (equalsIndex == -1 || equalsIndex + 1 >= algebraicBase.length) {
    throw Error("Unable to update promotion letter on a non-promotion move: " + algebraicBase);
  }

  let replacementLetter = "";

  switch (actionType) {
    case "PawnPromoteBishop":
      replacementLetter = "B";
      break;
    case "PawnPromoteKnight":
      replacementLetter = "N";
      break;
    case "PawnPromoteQueen":
      replacementLetter = "Q";
      break;
    case "PawnPromoteRook":
      replacementLetter = "R";
      break;
    default:
      break;
  }

  return (
    algebraicBase.slice(0, equalsIndex + 1) +
    replacementLetter +
    algebraicBase.slice(equalsIndex + 2)
  );
}
