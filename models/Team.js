const db = require('../config/database');

class Team {
    static async getAll() {
        try {
            const [rows] = await db.execute(`
                SELECT DISTINCT takim, 
                       COUNT(*) as oyuncuSayisi,
                       ROUND(AVG(deger), 2) as ortDeger,
                       ROUND(SUM(deger), 2) as toplamDeger
                FROM futbolcular 
                WHERE takim IS NOT NULL 
                GROUP BY takim
                ORDER BY toplamDeger DESC
            `);
            return rows;
        } catch (err) {
            console.error('Takımları getirme hatası:', err);
            throw err;
        }
    }

    static async getTeamStats(teamName) {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    takim,
                    COUNT(*) as oyuncuSayisi,
                    ROUND(AVG(deger), 2) as ortDeger,
                    ROUND(SUM(deger), 2) as toplamDeger,
                    ROUND(AVG(yas), 1) as yasOrtalamasi
                FROM futbolcular 
                WHERE takim = ?
                GROUP BY takim
            `, [teamName]);
            return rows[0];
        } catch (err) {
            console.error('Takım istatistikleri hatası:', err);
            throw err;
        }
    }

    static async getTeamPlayers(teamName) {
        try {
            const [rows] = await db.execute(`
                SELECT *
                FROM futbolcular
                WHERE takim = ?
                ORDER BY deger DESC
            `, [teamName]);
            return rows;
        } catch (err) {
            console.error('Takım oyuncuları hatası:', err);
            throw err;
        }
    }
}

module.exports = Team; 