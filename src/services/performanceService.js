const db = require('../config/database');

class PerformanceService {
    async getPlayerPerformance(playerId) {
        const [rows] = await db.execute(`
            SELECT 
                o.ad, o.soyad,
                oi.sezon,
                oi.mac_sayisi,
                oi.gol,
                oi.asist,
                oi.sari_kart,
                oi.kirmizi_kart,
                oi.dakika,
                ROUND(oi.gol * 90 / oi.dakika, 2) as gol_dakika_orani,
                ROUND((oi.gol + oi.asist) * 90 / oi.dakika, 2) as skor_katkisi
            FROM oyuncu_istatistikleri oi
            JOIN oyuncular o ON oi.oyuncu_id = o.id
            WHERE oi.oyuncu_id = ?
            ORDER BY oi.sezon DESC
        `, [playerId]);
        return rows;
    }

    async getTeamPerformance(teamId) {
        const [rows] = await db.execute(`
            SELECT 
                t.takim_adi,
                ti.sezon,
                ti.mac_sayisi,
                ti.galibiyet,
                ti.beraberlik,
                ti.maglubiyet,
                ti.atilan_gol,
                ti.yenilen_gol,
                ti.puan,
                ti.siralama
            FROM takim_istatistikleri ti
            JOIN takımlar t ON ti.takim_id = t.id
            WHERE ti.takim_id = ?
            ORDER BY ti.sezon DESC
        `, [teamId]);
        return rows;
    }
}

module.exports = new PerformanceService(); 