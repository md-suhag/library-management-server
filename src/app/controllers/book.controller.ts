import express from "express";
import { Book } from "../models/book.model";

export const bookRouter = express.Router();

bookRouter.post("/", async (req, res) => {
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
    // res.status(400).json({
    //   message: error?.message,
    //   success: false,
    //   error: error,
    // });
  }
});
bookRouter.get("/", (req, res) => {
  console.log("all books");
});
