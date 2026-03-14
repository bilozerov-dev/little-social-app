"use client";

import classNames from "@/utils/classNames";
import { ElementType, PropsWithChildren } from "react";
import { useLayoutContext } from "../providers/layout/use-layout-context";

export type ContainerComponentProps = Partial<
  Record<"filler" | "wrapper", string>
>;

export default function Container({
  children,
  wrapper,
  filler,
  as: Tag = "div",
}: PropsWithChildren<{ as?: ElementType } & ContainerComponentProps>) {
  const { container } = useLayoutContext();

  return (
    <Tag
      className={classNames(
        "max-w-[92%] sm:max-w-[80%] md:max-w-[60%] mx-auto flex flex-col h-full max-h-full w-full py-8 md:py-10 lg:py-12",
        wrapper,
        container?.wrapper
      )}
    >
      <div
        className={classNames(
          "bg-background/90 grow flex flex-col h-full rounded-3xl p-4 sm:p-6 md:p-10 lg:p-14",
          filler,
          container?.filler
        )}
        style={{
          boxShadow:
            "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        {children}
      </div>
    </Tag>
  );
}
