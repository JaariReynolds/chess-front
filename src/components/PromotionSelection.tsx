import { useChessContext } from "../contexts/chessContext";
import { ActionType } from "../types/literals";
import "./promotion-selection.css";

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
    <div className="promotion-selection-container">
      <button
        className="promote-button"
        type="button"
        onClick={() => handlePromotionSelection("PawnPromoteBishop")}
      >
        Bishop
      </button>
      <button
        className="promote-button"
        type="button"
        onClick={() => handlePromotionSelection("PawnPromoteKnight")}
      >
        Knight
      </button>
      <button
        className="promote-button"
        type="button"
        onClick={() => handlePromotionSelection("PawnPromoteRook")}
      >
        Rook
      </button>
      <button
        className="promote-button"
        type="button"
        onClick={() => handlePromotionSelection("PawnPromoteQueen")}
      >
        Queen
      </button>
      <button
        className="promote-button"
        type="button"
        onClick={() => setPromotionSelectionVisible(false)}
      >
        x
      </button>
    </div>
  );
}
