import { createPortal } from "react-dom";
import { cloneElement, type ReactElement } from "react";
import { X } from "lucide-react";
import { useModalContext } from "../hooks/use-modal-context";
import { useOutsideClick } from "../../../hooks";

interface ModalWindowProps {
  name: string;
  children: ReactElement<{ onCloseModal: () => void }>;
}

export function ModalWindow({ name, children }: ModalWindowProps) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div ref={ref} className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-full overflow-auto">
        <button
          onClick={close}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:bg-red-400"
        >
          <X className="w-6 h-6 text-gray-700 hover:text-white" />
        </button>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body
  );
}
