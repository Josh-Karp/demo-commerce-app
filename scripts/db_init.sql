CREATE DATABASE demo_db;
USE demo_db;

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(80),
    Email VARCHAR(120),
    PASSWORD VARCHAR(120),
    First_name VARCHAR(300),
    Last_name VARCHAR(300),
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); INSERT INTO users(
    username,
    email,
    password,
    first_name,
    last_name
)
VALUES(
    'admin',
    'admin',
    'admin',
    'Mitchell',
    'Admin'
),(
    'user_good',
    'email_good@good.com',
    'password_good',
    'Demo',
    'User'
);

CREATE TABLE product(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(300),
    description VARCHAR(300),
    brand VARCHAR(300),
    sku VARCHAR(300),
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); INSERT INTO product(
    NAME,
    description,
    brand,
    sku,
    price
)
VALUES(
    'Product 1',
    'Description for Product 1',
    'Brand A',
    'SKU001',
    10.99
),(
    'Product 2',
    'Description for Product 2',
    'Brand B',
    'SKU002',
    20.99
),(
    'Product 3',
    'Description for Product 3',
    'Brand C',
    'SKU003',
    30.99
),(
    'Product 4',
    'Description for Product 4',
    'Brand D',
    'SKU004',
    40.99
),(
    'Product 5',
    'Description for Product 5',
    'Brand E',
    'SKU005',
    50.99
);