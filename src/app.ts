import express, { Application, NextFunction, Request, Response } from "express";
import { bookRouter } from "./app/controllers/book.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(express.json());

// api endpoints
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management Server");
});

// not found route handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
// Global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";

  if (error.name === "ValidationError") {
    error.statusCode = 400;
    error.message = "Validation Error";
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    error: error,
  });
});
export default app;
