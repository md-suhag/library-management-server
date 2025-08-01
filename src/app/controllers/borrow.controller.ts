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
          message: "No sufficient copies of book available to borrow",
          error: {},
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found",
        error: {},
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

borrowRouter.get("/", async (req: Request, res: Response) => {
  try {
    const result = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",

          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
