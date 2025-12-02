import { createContext } from "react";

export interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined);
