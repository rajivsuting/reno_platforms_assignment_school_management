-- School Management System Database Setup
-- Run this script in your MySQL database

-- Create database
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX idx_schools_city ON schools(city);
CREATE INDEX idx_schools_state ON schools(state);
CREATE INDEX idx_schools_name ON schools(name(100));

-- Insert sample data (optional)
INSERT INTO schools (name, address, city, state, contact, email_id) VALUES
('St. Mary\'s High School', '123 Education Street', 'Mumbai', 'Maharashtra', '9876543210', 'stmarys@school.com'),
('Delhi Public School', '456 Knowledge Avenue', 'Delhi', 'Delhi', '8765432109', 'dps@school.com'),
('Kendriya Vidyalaya', '789 Learning Road', 'Bangalore', 'Karnataka', '7654321098', 'kv@school.com'),
('Modern School', '321 Wisdom Lane', 'Chennai', 'Tamil Nadu', '6543210987', 'modern@school.com'),
('Springfield Academy', '654 Excellence Drive', 'Hyderabad', 'Telangana', '5432109876', 'springfield@school.com');

-- Show table structure
DESCRIBE schools;

-- Show sample data
SELECT * FROM schools;
