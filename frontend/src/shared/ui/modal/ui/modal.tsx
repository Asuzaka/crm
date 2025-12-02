import { type ReactNode } from "react";
import { ModalOpen } from "./modal-open";
import { ModalWindow } from "./modal-window";
import { ModalProvider } from "../model/modal-provider";

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>;
}

Modal.Open = ModalOpen;
Modal.Window = ModalWindow;
