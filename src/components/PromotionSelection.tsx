import { useChessContext } from "../contexts/chessContext";
import { ActionType } from "../types/literals";

export default function PromotionSelection() {
  const {
    promotionActionBase,
    setPromotionActionBase,
    setPromotionSelectionVisible,
    setSelectedAction,
  } = useChessContext();

  function handlePromotionSelection(selectedPromotion: ActionType) {
    if (promotionActionBase == null) {
      setPromotionSelectionVisible(false);
      return;
    }

    setSelectedAction({ ...promotionActionBase, actionType: selectedPromotion });
    setPromotionActionBase(null);
    setPromotionSelectionVisible(false);
  }

  return (
    <div>
      <button type="button" onClick={() => handlePromotionSelection("PawnPromoteBishop")}>
        Bishop
      </button>
      <button type="button" onClick={() => handlePromotionSelection("PawnPromoteKnight")}>
        Knight
      </button>
      <button type="button" onClick={() => handlePromotionSelection("PawnPromoteRook")}>
        Rook
      </button>
      <button type="button" onClick={() => handlePromotionSelection("PawnPromoteQueen")}>
        Queen
      </button>
      <button type="button" onClick={() => setPromotionSelectionVisible(false)}>
        x
      </button>
    </div>
  );
}
