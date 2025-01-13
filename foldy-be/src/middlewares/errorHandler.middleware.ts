import { Request, Response, NextFunction } from "express";

// Middleware to handle errors
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack); // Log the error stack trace for debugging

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
};

export default errorHandler;
