const db = require('../config/database');

class Transfer {
    static async getAll() {
        try {
            const [rows] = await db.execute(`
                SELECT t.*, f.AdSoyad, f.Yas, e.TakimAdi as EskiTakim, y.TakimAdi as YeniTakim 
                FROM transfer t
                JOIN futbolcu f ON t.FutbolcuID = f.ID
                JOIN takim e ON t.EskiTakimID = e.ID
                JOIN takim y ON t.YeniTakimID = y.ID
                ORDER BY t.TransferTarihi DESC
            `);
            return rows;
        } catch (err) {
            console.error('Transfer listesi hatası:', err);
            throw err;
        }
    }

    static async getByTeam(teamId) {
        try {
            const [rows] = await db.execute(`
                SELECT t.*, f.AdSoyad, f.Yas, e.TakimAdi as EskiTakim, y.TakimAdi as YeniTakim 
                FROM transfer t
                JOIN futbolcu f ON t.FutbolcuID = f.ID
                JOIN takim e ON t.EskiTakimID = e.ID
                JOIN takim y ON t.YeniTakimID = y.ID
                WHERE t.EskiTakimID = ? OR t.YeniTakimID = ?
                ORDER BY t.TransferTarihi DESC
            `, [teamId, teamId]);
            return rows;
        } catch (err) {
            console.error('Takım transferleri hatası:', err);
            throw err;
        }
    }

    static async addTransfer(transfer) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            // Transfer kaydı ekle
            const [result] = await connection.execute(`
                INSERT INTO transfer (FutbolcuID, EskiTakimID, YeniTakimID, Bonservis, TransferTarihi)
                VALUES (?, ?, ?, ?, ?)
            `, [transfer.futbolcuId, transfer.eskiTakimId, transfer.yeniTakimId, transfer.bonservis, transfer.tarih]);

            // Oyuncunun takımını güncelle
            await connection.execute(`
                UPDATE futbolcu 
                SET TakimID = ? 
                WHERE ID = ?
            `, [transfer.yeniTakimId, transfer.futbolcuId]);

            await connection.commit();
            return result.insertId;
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}

module.exports = Transfer; 