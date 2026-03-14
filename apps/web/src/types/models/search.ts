import { Prisma } from "@prisma/client";

export type UserSearchResult = Prisma.UserGetPayload<{
  select: {
    id: true;
    name: true;
    image: true;
    email: true;
  };
}>;
