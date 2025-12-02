import { cloneElement, type ReactElement } from "react";
import { useModalContext } from "../hooks/use-modal-context";

interface ModalOpenProps {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
}

export function ModalOpen({ children, opens }: ModalOpenProps) {
  const { open } = useModalContext();

  return cloneElement(children, {
    ...children.props,
    onClick: () => open(opens),
  });
}
