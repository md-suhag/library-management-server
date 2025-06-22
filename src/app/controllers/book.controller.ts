import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const book = await Book.create(body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error?._message,
      success: false,
      error: {
        name: error?.name,
        errors: error?.errors,
      },
    });
  }
});
bookRouter.get("/", async (req: Request, res: Response) => {
  const filter =
    typeof req.query.filter === "string" ? req.query.filter : undefined;
  const sortBy =
    typeof req.query.sortBy === "string" ? req.query.sortBy : "createdAt";
  const sort = req.query.sort === "desc" ? "desc" : "asc";
  const limit =
    typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;

  const query = filter ? { genre: filter.toUpperCase() } : {};

  const books = await Book.find(query)
    .sort({ [sortBy]: sort })
    .limit(limit);

  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});
