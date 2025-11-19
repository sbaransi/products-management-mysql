import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddProductPage from "./pages/AddProductPage";
import ProductsTablePage from "./pages/ProductsTablePage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Products Management System</h1>
        </header>

        <Routes>
          <Route path="/" element={<AddProductPage />} />
          <Route path="/products" element={<ProductsTablePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
