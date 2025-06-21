import mongoose from "mongoose";
import app from "./app";

const PORT = 4000;
let server;

function main() {
  server = app.listen(PORT, async () => {
    await mongoose.connect("mongodb://localhost:27017/library");
    console.log("Connected to MongoDB successfully");
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();
