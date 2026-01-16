const db = require('../config/database');

class NewsService {
    async getLatestNews() {
        const [rows] = await db.execute(`
            SELECT 
                h.*,
                t.takim_adi,
                o.ad, o.soyad
            FROM haberler h
            LEFT JOIN takımlar t ON h.takim_id = t.id
            LEFT JOIN oyuncular o ON h.oyuncu_id = o.id
            ORDER BY h.tarih DESC
            LIMIT 10
        `);
        return rows;
    }

    async getTransferNews() {
        const [rows] = await db.execute(`
            SELECT 
                h.*,
                t1.takim_adi as eski_takim,
                t2.takim_adi as yeni_takim,
                o.ad, o.soyad
            FROM haberler h
            JOIN transfer tr ON h.transfer_id = tr.id
            JOIN takımlar t1 ON tr.eski_takim_id = t1.id
            JOIN takımlar t2 ON tr.yeni_takim_id = t2.id
            JOIN oyuncular o ON tr.oyuncu_id = o.id
            WHERE h.kategori = 'transfer'
            ORDER BY h.tarih DESC
        `);
        return rows;
    }
}

module.exports = new NewsService(); 