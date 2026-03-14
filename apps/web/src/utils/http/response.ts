export class UnauthorizedResponse extends Response {
  constructor() {
    super("No user session", { status: 401 });
  }
}

export class InternalErrorResponse extends Response {
  constructor(msg?: string) {
    super(msg ?? "Internal error", { status: 500 });
  }
}

export class BadRequestResponse extends Response {
  constructor(message: string = "Bad request") {
    super(message, { status: 400 });
  }
}
