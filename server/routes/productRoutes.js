const express = require('express');
const db = require('../db'); 
const router = express.Router();

router.post('/products', async (req, res) => {
    const { image, title, category, stock, price } = req.body;
    const sql = 'INSERT INTO products (image, title, category, stock, price) VALUES (?, ?, ?, ?, ?)';
    try {
        const [result] = await db.execute(sql, [image, title, category, stock, price]);
        res.status(201).json({ message: 'Product created', id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products', async (req, res) => {
    const sql = 'SELECT * FROM products';
    try {
        const [rows] = await db.execute(sql);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    try {
        const [rows] = await db.execute(sql, [id]);
        if (rows.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json(rows[0]);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { image, title, category, stock, price } = req.body;
    const sql = 'UPDATE products SET image = ?, title = ?, category = ?, stock = ?, price = ? WHERE id = ?';
    try {
        const [result] = await db.execute(sql, [image, title, category, stock, price, id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json({ message: 'Product updated' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    try {
        const [result] = await db.execute(sql, [id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Product not found' });
        } else {
            res.status(200).json({ message: 'Product deleted' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
