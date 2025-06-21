import express, { Application, NextFunction, Request, Response } from "express";
import { bookRouter } from "./app/controllers/book.controller";

const app: Application = express();

app.use(express.json());

// api endpoints
app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management Server");
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: error,
  });
});
export default app;
