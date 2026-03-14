"use client";

import { User } from "../types/User";
import Avatar from "./Avatar";

interface UserShortInfoProps {
  user: User;
}

export default function UserShortInfo({ user }: UserShortInfoProps) {
  return (
    <div className="flex gap-3 lg:gap-6">
      <div className="flex-shrink-0 relative w-60 h-60">
        {/* <RadialMenu componentClassNames={{ wrapper: "rounded-full" }}> */}
        <Avatar
          src={user.avatar.src}
          alt={user.avatar.alt}
          width={user.avatar.width}
          height={user.avatar.height}
          className="aspect-square"
        />
        {/* </RadialMenu> */}
      </div>

      <div className="flex flex-col gap-3 lg:gap-4">
        <h2 className="flex-shrink-0 h2">{user.displayName}</h2>
        <div className="h-full grow rounded-xl lg:rounded-3xl flex flex-col gap-2">
          <div className="regular-1">Інтереси: футбол, книги, азійська їжа</div>
          <div className="regular-1">Про себе: хороша людина</div>
          <div className="regular-1">Робочий статус: працює в Компанія</div>
          <div className="regular-1">Сімейний статус: в стосунках з Лідія</div>
        </div>
      </div>
    </div>
  );
}
