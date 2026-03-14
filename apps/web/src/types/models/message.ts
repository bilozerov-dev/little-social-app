import { Prisma } from "@prisma/client";

export type PaginatedChatMessageGetPayload = Awaited<
  Prisma.PrismaPromise<
    ({
      user: {
        id: string;
        name: string | null;
        image: string | null;
      };
    } & {
      id: string;
      createdAt: Date;
      text: string;
      userId: string;
      chatId: string;
    })[]
  >
>;
