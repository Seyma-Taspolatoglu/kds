const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Takıma göre oyuncuları getir
router.get('/team/:teamName', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT o.*, t.takim_adi 
            FROM oyuncular o
            JOIN takimlar t ON o.takim_id = t.id
            WHERE t.takim_adi = ?
            ORDER BY o.numara
        `, [req.params.teamName]);
        
        res.json(rows);
    } catch (err) {
        console.error('Takım oyuncularını getirme hatası:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 