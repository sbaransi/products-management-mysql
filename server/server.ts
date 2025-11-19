import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database";
import productsRoutes from "./routes/products";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productsRoutes);

// Test database connection and start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Test MySQL connection
    await pool.query("SELECT 1");
    console.log("Connected to MySQL");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("MySQL connection error:", error);
  }
};

startServer();
