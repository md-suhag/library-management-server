import { model, Schema } from "mongoose";
import { TBook } from "../interfaces/book.interface";

const bookSchema = new Schema<TBook>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: [true, "isnb number is required"],
      unique: [true, "ISBN must be unique"],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Total copies of book is required"],
      min: [1, "Copies must be a positive number"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Book = model<TBook>("Book", bookSchema);
