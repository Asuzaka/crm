import { Suspense, type ReactNode } from "react";
import { Loader } from "../components/loader";

export function SuspenseWrapper({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
}
