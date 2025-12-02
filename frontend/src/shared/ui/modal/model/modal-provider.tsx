import { useState, useCallback, type ReactNode } from "react";
import { ModalContext } from "./modal-context";

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const open = useCallback((name: string) => setOpenName(name), []);
  const close = useCallback(() => setOpenName(""), []);

  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>;
}
