// app/api/messages/route.ts
import prisma from "@/lib/prisma/prisma";
import { tryAuthorizedRequest } from "@/utils/http/try-autorized-request";
import { BadRequestResponse } from "@/utils/http/response";

export const GET = (request: Request) =>
  tryAuthorizedRequest(request, async () => {
    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");
    const cursor = searchParams.get("cursor"); // For pagination
    const limit = parseInt(searchParams.get("limit") || "20");

    if (!chatId) {
      return new BadRequestResponse("Chat ID is required");
    }

    const messages = await prisma.message.findMany({
      where: { chatId },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    const nextCursor =
      messages.length === limit ? messages[messages.length - 1].id : null;

    return Response.json({
      messages,
      nextCursor,
    });
  });

export const POST = (request: Request) =>
  tryAuthorizedRequest(request, async (_, session) => {
    const body = await request.json();
    const { content, chatId } = body;

    if (!content || !chatId) {
      return new BadRequestResponse("Content and chat ID are required");
    }

    const newMessage = await prisma.message.create({
      data: {
        text: content,
        chat: { connect: { id: chatId } },
        user: { connect: { id: session.user.id } },
      },
      include: { user: { select: { id: true, name: true, image: true } } },
    });

    return Response.json(newMessage);
  });
