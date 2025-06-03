export class AppError extends Error {
  statusCode = 400;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
