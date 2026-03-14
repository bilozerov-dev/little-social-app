"use client";

import { PropsWithChildren, useMemo } from "react";
import { LayoutContext, LayoutContextT } from "./layout-context";

export function LayoutContextProvider({
  children,
  container,
}: PropsWithChildren<LayoutContextT>) {
  const ctxValue = useMemo<LayoutContextT>(() => {
    return {
      container,
    };
  }, [container]);
  return (
    <LayoutContext.Provider value={ctxValue}>{children}</LayoutContext.Provider>
  );
}
