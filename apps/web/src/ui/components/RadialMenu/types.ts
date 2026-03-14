import { ComponentClassNames } from "@/ui/types/ComponentClassNames";
import { MouseEventHandler, PropsWithChildren } from "react";

type RadialComponentClassNames = "wrapper";

export type RadialMenuProps = PropsWithChildren<
  {} & ComponentClassNames<RadialComponentClassNames>
>;

export type RadialMenuWrapperProps = PropsWithChildren<{
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}>;
