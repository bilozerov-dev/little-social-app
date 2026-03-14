import { getServerSession } from "@/lib/auth/auth";
import prisma from "@/lib/prisma/prisma";
import {
  InternalErrorResponse,
  UnauthorizedResponse,
} from "@/utils/http/response";
import { tryCatch } from "@/utils/try-catch";

// eslint-disable-next-line no-unused-vars
async function handleUserSearchGetRequest(request: Request): Promise<Response> {
  const session = await getServerSession();

  if (!session || !session.user?.id) {
    return new UnauthorizedResponse();
  }

  const users = await prisma.user.findMany({
    where: {},
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
    },
  });

  return Response.json(users);
}

export async function GET(request: Request) {
  const { data: response } = await tryCatch(
    handleUserSearchGetRequest(request),
  );

  if (response) {
    return response;
  }

  return new InternalErrorResponse();
}
