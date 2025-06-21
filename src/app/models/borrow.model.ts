import { model, Schema } from "mongoose";
import { TBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<TBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity cannot be negative"],
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export const Borrow = model<TBorrow>("Borrow", borrowSchema);
