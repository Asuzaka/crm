import { lazy, type ComponentType } from "react";

/**
 * FSD-friendly lazy import helper for named exports.
 * Works with modules that export React components by name.
 *
 * Example:
 *   const DashboardPage = lazyImport(() => import("@/pages/dashboard"), "DashboardPage");
 */
export function lazyImport<
  TModule extends Record<string, unknown>,
  TKey extends keyof TModule,
  TComponent extends ComponentType<unknown> = Extract<TModule[TKey], ComponentType<unknown>>
>(factory: () => Promise<TModule>, name: TKey) {
  return lazy(() =>
    factory().then((module) => ({
      default: module[name] as TComponent,
    }))
  );
}
