const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Tüm takımları getir
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM takimlar');
        res.json(rows);
    } catch (err) {
        console.error('Takımları getirme hatası:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 