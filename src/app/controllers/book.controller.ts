import express from "express";

export const bookRouter = express.Router();

bookRouter.get("/", (req, res) => {
  console.log("all books");
});
