import classNames from "@/utils/classNames";
import { RadialMenuProps, RadialMenuWrapperProps } from "./types";
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from "react-circular-menu";
import { MouseEventHandler, useCallback } from "react";

const radiaMenuItemClassName =
  "text-sm !text-slate-600 hover:!text-green-600 !bg-slate-200 hover:!border-green-600 !border !border-slate-500 !p-2 !rounded-full !w-auto !h-auto";
export default function RadialMenu({
  children,
  componentClassNames,
}: RadialMenuProps) {
  return (
    <CircleMenu
      startAngle={0}
      rotationAngle={360}
      itemSize={10}
      radius={11}
      className=""
      rotationAngleInclusive={false}
      menuToggleElement={
        <RadialMenu.Wrapper className={componentClassNames.wrapper}>
          {children}
        </RadialMenu.Wrapper>
      }
    >
      <CircleMenuItem
        onClick={() => alert("Clicked the item")}
        tooltip="Email"
        tooltipPlacement={TooltipPlacement.Right}
        className={radiaMenuItemClassName}
      >
        🙄 Friendly introduce
      </CircleMenuItem>
      <CircleMenuItem className={radiaMenuItemClassName} tooltip="Help">
        🤫 Tell a secret
      </CircleMenuItem>
      <CircleMenuItem className={radiaMenuItemClassName} tooltip="Location">
        🥴 Tell a cringe joke
      </CircleMenuItem>
      <CircleMenuItem className={radiaMenuItemClassName} tooltip="Info">
        🤭 Invite to dance
      </CircleMenuItem>
    </CircleMenu>
  );
}

RadialMenu.Wrapper = function RadialMenuWrapper({
  className,
  children,
  onClick,
}: RadialMenuWrapperProps) {
  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!onClick) {
        return;
      }

      onClick(e);
    },
    [onClick]
  );
  return (
    <div
      onClick={handleClick}
      className={classNames(
        "cursor-pointer w-fit relative flex justify-center items-center",
        className
      )}
    >
      <div
        className="absolute -inset-[1px] -z-10 rounded-full"
        style={{
          background: "var(--bg-gradient-linear-mainTheme)",
        }}
      ></div>
      {children}
    </div>
  );
};
