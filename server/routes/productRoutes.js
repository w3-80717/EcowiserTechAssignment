const express = require('express');
// const db = require('../db'); 
const router = express.Router();

let products = [];
let nextId = 1;

router.post('/products', async (req, res) => {
    const { image, title, category, stock, price } = req.body;
    // const sql = 'INSERT INTO products (image, title, category, stock, price) VALUES (?, ?, ?, ?, ?)';
    try {
        // const [result] = await db.execute(sql, [image, title, category, stock, price]);
        const newProduct = { id: nextId++, image, title, category, stock, price };
        products.push(newProduct);
        res.status(201).json({ message: 'Product created', id: newProduct.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products', async (req, res) => {
    // const sql = 'SELECT * FROM products';
    try {
        // const [rows] = await db.execute(sql);
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    // const sql = 'SELECT * FROM products WHERE id = ?';
    try {
        // const [rows] = await db.execute(sql, [id]);
        // if (rows.length === 0) {
        const product = products.find((p) => p.id === parseInt(id));
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            // res.status(200).json(rows[0]);
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, category, stock, price } = req.body;
    // const sql = 'UPDATE products SET image = ?, title = ?, category = ?, stock = ?, price = ? WHERE id = ?';
    try {
        // const [result] = await db.execute(sql, [image, title, category, stock, price, id]);
        // if (result.affectedRows === 0) {
        const productIndex = products.findIndex((p) => p.id === parseInt(id));
        if (productIndex === -1) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            // res.status(200).json({ message: 'Product updated' });
            products[productIndex] = { id: parseInt(id), image, title, category, stock, price };
            res.status(200).json({ message: 'Product updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    // const sql = 'DELETE FROM products WHERE id = ?';
    try {
        // const [result] = await db.execute(sql, [id]);
        // if (result.affectedRows === 0) {
        const productIndex = products.findIndex((p) => p.id === parseInt(id));
        if (productIndex === -1) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            // res.status(200).json({ message: 'Product deleted' });
            products.splice(productIndex, 1);
            res.status(200).json({ message: 'Product deleted' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
