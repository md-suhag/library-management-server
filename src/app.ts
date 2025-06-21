import express, { Application, Request, Response } from "express";
import { bookRouter } from "./app/models/book.model";

const app: Application = express();

app.use(express.json());

app.use("/api/books", bookRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management Server");
});

export default app;
