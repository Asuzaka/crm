import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { useOutsideClick } from "../hooks";

// ----------------------
// Modal Context
// ----------------------
interface ModalContextType {
  openName: string;
  open: (name: string) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const open = (name: string) => setOpenName(name);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return context;
}

// ----------------------
// Modal.Open
// ----------------------
interface OpenProps {
  children: ReactElement<{ onClick?: () => void }>;
  opens: string;
}

function Open({ children, opens }: OpenProps) {
  const { open } = useModalContext();
  return cloneElement(children, {
    ...children.props,
    onClick: () => open(opens),
  });
}

// ----------------------
// Modal.Window
// ----------------------
interface WindowProps {
  name: string;
  children: ReactElement<{ onCloseModal: () => void }>;
}

function Window({ name, children }: WindowProps) {
  const { openName, close } = useModalContext();
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div
        ref={ref}
        className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg max-h-full overflow-auto"
      >
        <button
          onClick={close}
          className="cursor-pointer absolute top-4 right-4 p-2 rounded-full transition-colors duration-200  hover:bg-red-400"
        >
          <X className="w-6 h-6 text-gray-700 hover:text-white" />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

// Attach subcomponents
Modal.Open = Open;
Modal.Window = Window;
