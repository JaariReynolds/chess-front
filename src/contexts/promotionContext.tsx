import { createContext, useContext, useState } from "react";
import { Action } from "../types/gameboard";

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
  const [promotionActionBase, setPromotionActionBase] = useState<Action | null>(null);
  const [promotionSelectionVisible, setPromotionSelectionVisible] = useState<boolean>(false);

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
