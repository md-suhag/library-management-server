import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRouter = express.Router();

borrowRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;

    const findedBook = await Book.findById(book);

    if (findedBook) {
      if (findedBook.copies >= quantity) {
        findedBook.copies = findedBook.copies - quantity;
        findedBook.updateAvailable();
        await findedBook.save();
        const borrowDetails = await Borrow.create({
          book,
          quantity,
          dueDate,
        });

        res.status(201).json({
          success: true,
          message: "Book borrowed successfully",
          data: borrowDetails,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "No book available to borrow",
          data: null,
        });
      }
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});
