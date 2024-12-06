CREATE DATABASE ecowiserdb;

USE ecowiserdb;

CREATE TABLE products
  (
     id       INT PRIMARY KEY auto_increment,
     image    VARCHAR(50),
     title    VARCHAR(50),
     category VARCHAR(50),
     stock    INT,
     price    FLOAT
  ); 