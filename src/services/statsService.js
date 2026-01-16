const db = require('../config/database');

class StatsService {
    async getTransferStats() {
        const [rows] = await db.execute(`
            SELECT 
                t.sezon,
                COUNT(*) as transfer_sayisi,
                ROUND(AVG(t.bonservis), 2) as ortalama_bonservis,
                SUM(t.bonservis) as toplam_bonservis,
                COUNT(DISTINCT o.takim_id) as aktif_takim_sayisi
            FROM transfer t
            JOIN oyuncular o ON t.oyuncu_id = o.id
            GROUP BY t.sezon
            ORDER BY t.sezon DESC
        `);
        return rows;
    }

    async getTeamValueComparison() {
        const [rows] = await db.execute(`
            SELECT 
                t.takim_adi,
                COUNT(o.id) as oyuncu_sayisi,
                ROUND(AVG(o.deger), 2) as ortalama_deger,
                SUM(o.deger) as toplam_deger,
                AVG(o.yas) as yas_ortalamasi
            FROM takımlar t
            LEFT JOIN oyuncular o ON t.id = o.takim_id
            GROUP BY t.id, t.takim_adi
            ORDER BY toplam_deger DESC
        `);
        return rows;
    }
}

module.exports = new StatsService(); 