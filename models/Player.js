const db = require('../config/database');

class Player {
    static async getAll() {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, t.takim_adi 
                FROM oyuncular o 
                LEFT JOIN takimlar t ON o.takim_id = t.id 
                ORDER BY o.piyasa_degeri DESC
            `);
            return rows;
        } catch (err) {
            console.error('Oyuncuları getirme hatası:', err);
            throw err;
        }
    }

    static async getByTeam(teamId) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, t.takim_adi,
                       i.goller, i.asistler, i.sutlar, i.sut_hedefte,
                       i.pas_basarisi_yuzdesi, i.top_kazanma, i.top_calma,
                       i.sari_kartlar, i.kirmizi_kartlar, i.dakika_suresi
                FROM oyuncular o 
                LEFT JOIN takimlar t ON o.takim_id = t.id
                LEFT JOIN oyuncu_istatistikleri i ON o.id = i.oyuncu_id
                WHERE o.takim_id = ?
                ORDER BY o.numara
            `, [teamId]);
            return rows;
        } catch (err) {
            console.error('Takım oyuncularını getirme hatası:', err);
            throw err;
        }
    }

    static async search(query) {
        try {
            const [rows] = await db.execute(`
                SELECT o.*, t.takim_adi 
                FROM oyuncular o 
                LEFT JOIN takımlar t ON o.takim_id = t.id 
                WHERE o.ad LIKE ? OR o.soyad LIKE ? OR t.takim_adi LIKE ?
            `, [`%${query}%`, `%${query}%`, `%${query}%`]);
            return rows;
        } catch (err) {
            console.error('Oyuncu arama hatası:', err);
            throw err;
        }
    }

    static async getStats() {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    COUNT(*) as totalPlayers,
                    COUNT(DISTINCT takim_id) as teamCount,
                    ROUND(AVG(deger), 2) as avgValue,
                    ROUND(SUM(deger), 2) as totalValue,
                    COUNT(DISTINCT ulke) as countryCount
                FROM oyuncular
            `);
            return rows[0];
        } catch (err) {
            console.error('İstatistik getirme hatası:', err);
            throw err;
        }
    }

    static async getPlayerStats(playerId) {
        try {
            const [rows] = await db.execute(`
                SELECT * FROM oyuncu_istatistikleri 
                WHERE oyuncu_id = ?
            `, [playerId]);
            return rows[0];
        } catch (err) {
            console.error('Oyuncu istatistikleri hatası:', err);
            throw err;
        }
    }

    static async getTeamStats(teamId) {
        try {
            const [stats] = await db.execute(`
                SELECT 
                    t.takim_adi,
                    COUNT(o.id) as oyuncu_sayisi,
                    ROUND(AVG(o.piyasa_degeri), 2) as ortalama_deger,
                    SUM(o.piyasa_degeri) as toplam_deger,
                    ROUND(AVG(o.yas), 1) as yas_ortalamasi,
                    COUNT(CASE WHEN o.ulke != 'Türkiye' THEN 1 END) as yabanci_sayisi
                FROM takimlar t
                LEFT JOIN oyuncular o ON t.id = o.takim_id
                WHERE t.id = ?
                GROUP BY t.id
            `, [teamId]);
            return stats[0];
        } catch (err) {
            console.error('Takım istatistikleri getirme hatası:', err);
            throw err;
        }
    }
}

module.exports = Player; 