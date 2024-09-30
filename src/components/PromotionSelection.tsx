import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useChessContext } from "../contexts/chessContext";
import { ActionType } from "../types/literals";
import "./promotion-selection.css";
import {
  faChessBishop,
  faChessKnight,
  faChessQueen,
  faChessRook,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function PromotionSelection() {
  const {
    gameboard,
    promotionActionBase,
    promotionSelectionVisible,
    setPromotionActionBase,
    setPromotionSelectionVisible,
    setSelectedAction,
  } = useChessContext();

  if (!promotionSelectionVisible) return null;

  function handlePromotionSelection(selectedPromotion: ActionType) {
    if (promotionActionBase == null) {
      setPromotionSelectionVisible(false);
      return;
    }

    setSelectedAction({ ...promotionActionBase, actionType: selectedPromotion });
    setPromotionActionBase(null);
    setPromotionSelectionVisible(false);
  }

  function closePromotionSelection() {
    setPromotionSelectionVisible(false);
  }

  const currentTeamColour = gameboard.currentTeamColour.toString();

  return (
    <div className="transparent-gameboard-container" onClick={closePromotionSelection}>
      <div className="promotion-selection-container">
        <button
          title="bishop"
          className="promote-button"
          type="button"
          onClick={() => handlePromotionSelection("PawnPromoteBishop")}
        >
          <FontAwesomeIcon icon={faChessBishop} size="3x" color={currentTeamColour} />
        </button>
        <button
          title="knight"
          className="promote-button"
          type="button"
          onClick={() => handlePromotionSelection("PawnPromoteKnight")}
        >
          <FontAwesomeIcon icon={faChessKnight} size="3x" color={currentTeamColour} />
        </button>
        <button
          title="rook"
          className="promote-button"
          type="button"
          onClick={() => handlePromotionSelection("PawnPromoteRook")}
        >
          <FontAwesomeIcon icon={faChessRook} size="3x" color={currentTeamColour} />
        </button>
        <button
          title="queen"
          className="promote-button"
          type="button"
          onClick={() => handlePromotionSelection("PawnPromoteQueen")}
        >
          <FontAwesomeIcon icon={faChessQueen} size="3x" color={currentTeamColour} />
        </button>
        <button
          title="cancel"
          className="promote-button"
          type="button"
          onClick={closePromotionSelection}
        >
          <FontAwesomeIcon icon={faXmark} size="2x" color={currentTeamColour} />
        </button>
      </div>
    </div>
  );
}
