const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Tüm transferleri getir
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM transfer');
        res.json(rows);
    } catch (err) {
        console.error('Transferleri getirme hatası:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 