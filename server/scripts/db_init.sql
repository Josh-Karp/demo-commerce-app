CREATE DATABASE demo_db;
USE demo_db;

CREATE TABLE roles(
    id INTEGER PRIMARY KEY,
    NAME VARCHAR(80) NOT NULL UNIQUE,
    description VARCHAR(100)
); INSERT INTO roles(
    id,
    NAME,
    description
) VALUES(
    1,
    'user',
    'User role'
),(
    2,
    'admin',
    'Admin role'
);

CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(80),
    Email VARCHAR(120) NOT NULL,
    PASSWORD LONGTEXT NOT NULL,
    First_name VARCHAR(300),
    Last_name VARCHAR(300),
    Role_id INT NOT NULL DEFAULT 1,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); INSERT INTO users(
    username,
    email,
    password,
    first_name,
    last_name,
    role_id
)
VALUES(
    'admin',
    'admin@admin.com',
    'scrypt:32768:8:1$lWzEYKGG$0441672606d50189bb0a286e762d0bdefaeafe0a7d76bcd5432cc3468f60a80508ee91ef5268f9f84dc5e50a20ded898c11259c48b4a2bddc79d100b2ea75537',
    'Joshua',
    'Admin',
    2
),(
    'user_good',
    'email_good@good.com',
    'password_good',
    'Demo',
    'User',
    1
);

CREATE TABLE product(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(300),
    category VARCHAR(300),
    description VARCHAR(300),
    brand VARCHAR(300),
    sku VARCHAR(300),
    price DECIMAL(10, 2),
    color VARCHAR(300),
    img_url VARCHAR(300),
    img_alt VARCHAR(300),
    popularity_score INT DEFAULT 50,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
); INSERT INTO product(
    NAME,
    category,
    description,
    brand,
    sku,
    price,
    color,
    img_url,
    img_alt,
    popularity_score
)
VALUES(
    'Basic Black Tee',
    'tee',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.',
    'nike',
    'SKU001',
    1050.50,
    'black',
    'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    'Front of men&#039;s Basic Black Tee by Nike.',
    65
),(
    'Basic White Tee',
    'other',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.',
    'nike',
    'SKU002',
    120.00,
    'white',
    'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
    'Front of men&#039;s Basic White Tee by Nike.',
    75
),(
    'Basic Grey Tee',
    'tee',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.',
    'addidas',
    'SKU003',
    430.99,
    'grey',
    'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
    'Front of men&#039;s Basic Grey Tee by Addidas.',
    25
),(
    'Hoodie',
    'hoodie',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in sem cras amet.',
    'nike',
    'SKU004',
    500.00,
    'black',
    'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
    'Front of men&#039;s Hoodie by Nike.',
    95
);