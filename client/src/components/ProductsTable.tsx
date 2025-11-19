import React, { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "../services/api";
import "./ProductsTable.css";

function ProductsTable() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError("Error loading products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        setError("Error deleting product");
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="table-container">
      <h2>Products List</h2>

      {products.length === 0 ? (
        <p>No products found. Add some!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Added On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.stock_quantity}</td>
                <td>{new Date(product.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id, product.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="back-btn" onClick={() => (window.location.href = "/")}>
        Add New Product
      </button>
    </div>
  );
}

export default ProductsTable;
