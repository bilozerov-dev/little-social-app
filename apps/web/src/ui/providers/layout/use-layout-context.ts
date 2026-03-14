"use client";

import { useContext } from "react";
import { LayoutContext } from "./layout-context";

export function useLayoutContext() {
  return useContext(LayoutContext);
}
