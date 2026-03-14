import prisma from "@/lib/prisma/prisma";
import {
  BadRequestResponse,
  InternalErrorResponse,
} from "@/utils/http/response";
import {
  AuthorizedRequestHandler,
  tryAuthorizedRequest,
} from "@/utils/http/try-autorized-request";

const handleCreateChatRequest: AuthorizedRequestHandler = async (
  request,
  session
) => {
  const { userId } = await request.json();

  if (!userId) {
    return new BadRequestResponse(`Param "userId" is required.`);
  }

  const isPersonalChat = userId === session.user.id;

  const chat = await prisma.chat.create({
    data: {
      users: {
        create: isPersonalChat
          ? [{ userId }]
          : [{ userId }, { userId: session.user.id }],
      },
    },
  });

  if (!chat) {
    return new InternalErrorResponse("Failed to create chat.");
  }

  return new Response(JSON.stringify(chat), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST = async (request: Request) =>
  tryAuthorizedRequest(request, handleCreateChatRequest);
