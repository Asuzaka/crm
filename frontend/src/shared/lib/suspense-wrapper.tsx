import { Suspense, type ReactNode } from "react";
import { Loader } from "../ui";

export function SuspenseWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
