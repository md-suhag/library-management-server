import { Model, model, Schema } from "mongoose";
import { BookMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookMethods>(
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
      validate: {
        validator: function (v: string) {
          return /^\d{10}$|^\d{13}$/.test(v);
        },
        message: "ISBN must be either 10 or 13 digits",
      },
      unique: [true, "ISBN must be unique"],
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: [true, "Total copies of book is required"],
      min: [0, "Copies must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
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
// set available false if copies equal 0  after borrowing book
bookSchema.method("updateAvailable", function () {
  if (this.copies === 0) {
    this.available = false;
  }
});
// set available false if copies equal 0 when creating a book
bookSchema.pre("save", function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});
// set available false if copies equal 0. set available true if copies greater than 0 when updating a book
bookSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update && typeof update === "object" && "copies" in update) {
    const copies = update.copies;
    update.available = copies > 0;
    this.setUpdate(update);
  }

  next();
});

export const Book = model("Book", bookSchema);
