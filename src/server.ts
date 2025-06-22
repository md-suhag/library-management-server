import mongoose from "mongoose";
import app from "./app";

const PORT = 4000;
let server;

async function main() {
  try {
    await mongoose.connect("mongodb://localhost:27017/library");
    console.log("Connected to MongoDB successfully");
    server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
