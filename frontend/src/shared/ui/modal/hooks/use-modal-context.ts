import { useContext } from "react";
import { ModalContext } from "../model/modal-context";

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal components must be used within <ModalProvider>");
  return context;
}
