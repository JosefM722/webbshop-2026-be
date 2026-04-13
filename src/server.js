import app from "./app.js";
import { connectToDatabase } from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
