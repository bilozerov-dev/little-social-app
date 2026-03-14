"use client";

import { ContainerComponentProps } from "@/ui/components/Container";
import { createContext } from "react";

type LayoutContextT = Partial<{
  container: ContainerComponentProps;
}>;

const LayoutContext = createContext<LayoutContextT>({
  container: { filler: "", wrapper: "" },
});

export { LayoutContext, type LayoutContextT };
