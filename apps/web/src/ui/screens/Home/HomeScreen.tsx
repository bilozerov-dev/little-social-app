"use client";

import useSession from "@/lib/auth/use-session";
import FoldersListAccordion from "@/ui/components/FoldersList/FoldersListAccordion";
import UserShortInfo from "@/ui/components/UserShortInfo";
import { FolderType } from "@/ui/types/Folder";
import { User } from "@/ui/types/User";
import { useMemo } from "react";

const userMock: User = {
  displayName: "No user",
  avatar: {
    src: "/images/mocks/blank-avatar.avif",
    alt: "Possibly a photo of John Doe",
    width: 240,
    height: 240,
  },
};

export function HomeScreen() {
  const sessionData = useSession();

  const shortInfoUserData = useMemo<User>(() => {
    if (sessionData.authenticated) {
      const { session } = sessionData;
      return {
        displayName: session.user?.name ?? "Where is my name?",
        avatar: {
          src:
            session.user?.image?.replace("=s96-c", "") ??
            "/images/mocks/avatar.jpg",
          alt: "Possibly user's avatar",
          width: 240,
          height: 240,
        },
      };
    }

    return userMock;
  }, [sessionData]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex-shrink-0">
        <UserShortInfo user={shortInfoUserData} />
      </div>

      <div className="rounded-xl lg:rounded-3xl h-full grow p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="h4">Folders</div>
          <div className="regular-1">
            Here is a description of a gallery folder
          </div>
        </div>
        <FoldersListAccordion
          folders={[
            {
              id: "1",
              title: "Карпати",
              description: "Папка з фоточками з карпат",
              type: FolderType.Gallery,
              images: [],
            },
            {
              id: "2",
              title: "Записки",
              description: "Якісь записочки",
              type: FolderType.Notes,
              notes: [],
            },
            {
              id: "3",
              title: "Греція",
              description: "Фоточки з Греції",
              type: FolderType.Gallery,
              images: [],
            },
          ]}
        />
      </div>
    </div>
  );
}
