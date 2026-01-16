const Player = require('../models/Player');
const logger = require('../utils/logger');

class PlayerService {
    async getAllPlayers() {
        try {
            const players = await Player.getAll();
            return players;
        } catch (error) {
            logger.error('Oyuncular getirilirken hata:', error);
            throw new Error('Oyuncular getirilemedi');
        }
    }

    async getPlayersByTeam(teamId) {
        try {
            const players = await Player.getByTeam(teamId);
            return players;
        } catch (error) {
            logger.error(`Takım oyuncuları getirilirken hata (Takım ID: ${teamId}):`, error);
            throw new Error('Takım oyuncuları getirilemedi');
        }
    }

    async getPlayerStats(playerId) {
        try {
            const stats = await Player.getPlayerStats(playerId);
            if (!stats) {
                throw new Error('Oyuncu istatistikleri bulunamadı');
            }
            return stats;
        } catch (error) {
            logger.error(`Oyuncu istatistikleri getirilirken hata (Oyuncu ID: ${playerId}):`, error);
            throw error;
        }
    }

    async searchPlayers(query) {
        try {
            const players = await Player.search(query);
            return players;
        } catch (error) {
            logger.error('Oyuncu araması yapılırken hata:', error);
            throw new Error('Oyuncu araması yapılamadı');
        }
    }
}

module.exports = new PlayerService(); 