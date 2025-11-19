import express from "express";
import pool from "../config/database";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM products ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// POST - Add new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category, stock_quantity } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if product already exists
    const [existing]: any = await pool.query(
      "SELECT * FROM products WHERE name = ?",
      [name]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Product already exists" });
    }

    // Insert new product
    const [result]: any = await pool.query(
      "INSERT INTO products (name, description, price, category, stock_quantity) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, category, stock_quantity || 0]
    );

    res.status(201).json({
      message: "Product added successfully",
      productId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.query(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
});

export default router;
