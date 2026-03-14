import { ErrorResponse } from "@/types/http";

export default function createErrorResponse(err: string | Error): Response {
  let errorData: ErrorResponse = { error: "" };
  if (typeof err === "string") {
    errorData.error = err;
    return Response.json(errorData);
  }

  const errMessage = `${err.name}: ${err.message}${
    !!err.stack && ` (Stack: ${err.stack})`
  }`;

  return Response.json({
    error: errMessage,
  });
}
