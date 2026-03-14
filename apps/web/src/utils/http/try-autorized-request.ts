"use server";

/* eslint-disable no-unused-vars */
import { Session } from "@/types/session";
import { tryCatch } from "../try-catch";
import { InternalErrorResponse, UnauthorizedResponse } from "./response";
import { getServerSession } from "@/lib/auth/auth";

export type AuthorizedRequestHandler = (
  request: Request,
  session: Required<Session>
) => Promise<Response>;

function isValidSession(v: Session): v is Required<Session> {
  return !!v.user;
}

export async function tryAuthorizedRequest(
  request: Request,
  handler: AuthorizedRequestHandler
) {
  const session = await getServerSession();

  if (!session || !isValidSession(session)) {
    return new UnauthorizedResponse();
  }

  const { data: response } = await tryCatch(handler(request, session));

  if (response) {
    return response;
  }

  return new InternalErrorResponse();
}
