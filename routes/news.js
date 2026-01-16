const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Tüm haberleri getir
router.get('/', async (req, res) => {
    try {
        const [news] = await db.execute('SELECT * FROM news ORDER BY news_date DESC');
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Kategoriye göre haberleri getir
router.get('/category/:category', async (req, res) => {
    try {
        const [news] = await db.execute(
            'SELECT * FROM news WHERE category = ? ORDER BY news_date DESC',
            [req.params.category]
        );
        res.json(news);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 