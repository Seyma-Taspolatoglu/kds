const playerService = require('../services/playerService');
const logger = require('../utils/logger');
const { successResponse, errorResponse } = require('../utils/helpers');

class PlayerController {
    async getAllPlayers(req, res) {
        try {
            const players = await playerService.getAllPlayers();
            return successResponse(res, 'Oyuncular başarıyla getirildi', players);
        } catch (error) {
            logger.error('getAllPlayers controller hatası:', error);
            return errorResponse(res, error.message);
        }
    }

    async getPlayersByTeam(req, res) {
        try {
            const { teamId } = req.params;
            const players = await playerService.getPlayersByTeam(teamId);
            return successResponse(res, 'Takım oyuncuları başarıyla getirildi', players);
        } catch (error) {
            logger.error('getPlayersByTeam controller hatası:', error);
            return errorResponse(res, error.message);
        }
    }

    async getPlayerStats(req, res) {
        try {
            const { playerId } = req.params;
            const stats = await playerService.getPlayerStats(playerId);
            return successResponse(res, 'Oyuncu istatistikleri başarıyla getirildi', stats);
        } catch (error) {
            logger.error('getPlayerStats controller hatası:', error);
            return errorResponse(res, error.message);
        }
    }

    async searchPlayers(req, res) {
        try {
            const { query } = req.query;
            const players = await playerService.searchPlayers(query);
            return successResponse(res, 'Oyuncu araması başarıyla tamamlandı', players);
        } catch (error) {
            logger.error('searchPlayers controller hatası:', error);
            return errorResponse(res, error.message);
        }
    }
}

module.exports = new PlayerController(); 