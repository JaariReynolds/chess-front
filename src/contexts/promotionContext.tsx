import { createContext, useContext, useEffect, useState } from "react";
import { Action } from "../types/gameboard";
import { useChessContext } from "./chessContext";

interface PromotionContextProviderProps {
  children: React.ReactNode;
}

interface PromotionContext {
  promotionActionBase: Action | null;
  setPromotionActionBase: React.Dispatch<React.SetStateAction<Action | null>>;
  promotionSelectionVisible: boolean;
  setPromotionSelectionVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromotionContext = createContext<PromotionContext | null>(null);

export default function PromotionContextProvider({ children }: PromotionContextProviderProps) {
  const { standardResetTrigger, advancedResetTrigger } = useChessContext();
  const [promotionActionBase, setPromotionActionBase] = useState<Action | null>(null);
  const [promotionSelectionVisible, setPromotionSelectionVisible] = useState<boolean>(false);

  useEffect(() => {
    setPromotionActionBase(null);
    setPromotionSelectionVisible(false);
  }, [standardResetTrigger, advancedResetTrigger]);

  return (
    <PromotionContext.Provider
      value={{
        promotionActionBase,
        setPromotionActionBase,
        promotionSelectionVisible,
        setPromotionSelectionVisible,
      }}
    >
      {children}
    </PromotionContext.Provider>
  );
}

export function usePromotionContext() {
  const context = useContext(PromotionContext);
  if (!context) {
    throw new Error("usePromotionContext must be used within a PromotionContextProvider");
  }
  return context;
}
