import type { TabButtonProps } from "../model/types/type";
import { TAB_ACTIVE, TAB_BASE, TAB_INACTIVE } from "../constants/classes";
import clsx from "clsx";

export function TabButton({ active, onClick, children, icon }: TabButtonProps) {
  return (
    <button onClick={onClick} className={clsx(TAB_BASE, active ? TAB_ACTIVE : TAB_INACTIVE)}>
      {icon && <span className="inline-flex items-center mr-1">{icon}</span>}
      {children}
    </button>
  );
}
