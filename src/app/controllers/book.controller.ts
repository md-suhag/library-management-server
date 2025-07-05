import express, { NextFunction, Request, Response } from "express";
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
      message: error.message,
      success: false,
      error: error,
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
bookRouter.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});
bookRouter.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const dataForUpdate = req.body;

    const book = await Book.findByIdAndUpdate(bookId, dataForUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Book Updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});

bookRouter.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const result = await Book.findByIdAndDelete(bookId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: {},
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Book Deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
      success: false,
      error: error,
    });
  }
});
