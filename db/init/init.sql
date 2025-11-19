CREATE DATABASE IF NOT EXISTS products_db;
USE products_db;

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('Electronics', 'Clothing', 'Food', 'Books') NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category, stock_quantity) VALUES
('iPhone 15', 'Latest Apple smartphone with advanced features', 999.99, 'Electronics', 50),
('Nike Air Max', 'Comfortable running shoes', 129.99, 'Clothing', 100),
('Organic Coffee', 'Premium arabica coffee beans', 15.99, 'Food', 200),
('JavaScript Guide', 'Complete guide to modern JavaScript', 39.99, 'Books', 75);