import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
};
