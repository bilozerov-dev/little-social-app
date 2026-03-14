/* eslint-disable no-unused-vars */
"use server";

import { tryCatch } from "../try-catch";
import { InternalErrorResponse } from "./response";

export async function tryRequest<T>(
  request: Request,
  handler: (request: Request) => Promise<T>
) {
  const { data: response } = await tryCatch(handler(request));

  if (response) {
    return response;
  }

  return new InternalErrorResponse();
}
