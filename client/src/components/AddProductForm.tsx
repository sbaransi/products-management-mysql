import React, { useState } from "react";
import { addProduct } from "../services/api";
import "./AddProductForm.css";

function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [stockQuantity, setStockQuantity] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !price) {
      setError("Please fill all required fields");
      return;
    }

    try {
      await addProduct({
        name,
        description,
        price: parseFloat(price),
        category,
        stock_quantity: parseInt(stockQuantity) || 0,
      });
      setShowPopup(true);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Electronics");
      setStockQuantity("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
          </select>
        </div>

        <div className="form-group">
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            placeholder="0"
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Product
        </button>
      </form>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <h3>✅ Success!</h3>
            <p>Product added successfully</p>
            <button onClick={() => (window.location.href = "/products")}>
              Go to Products Table
            </button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProductForm;
