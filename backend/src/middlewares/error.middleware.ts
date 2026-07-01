import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export default function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: err instanceof Error ? err.message : "Internal server error",
  });
}
