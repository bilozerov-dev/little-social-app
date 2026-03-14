import { Prisma } from "@prisma/client";

export type ChatOnUserFindManyResult = Prisma.ChatOnUserGetPayload<{
  select: {
    chat: {
      select: {
        id: true;
        name: true;
        users: {
          select: {
            userId: true,
            user: {
              select: {
                name: true;
                image: true;
              };
            };
          };
        };
        messages: {
          orderBy: {
            createdAt: "desc";
          };
          take: 1;
          select: {
            text: true;
            createdAt: true;
          };
        };
      };
    };
  };
}>;
