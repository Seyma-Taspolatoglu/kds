const statsService = require('../services/statsService');
const logger = require('../utils/logger');

class StatsController {
    async getTransferStats(req, res) {
        try {
            const stats = await statsService.getTransferStats();
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            logger.error('Transfer istatistikleri hatası:', error);
            res.status(500).json({
                success: false,
                message: 'İstatistikler alınamadı'
            });
        }
    }

    async getTeamComparison(req, res) {
        try {
            const comparison = await statsService.getTeamValueComparison();
            res.json({
                success: true,
                data: comparison
            });
        } catch (error) {
            logger.error('Takım karşılaştırma hatası:', error);
            res.status(500).json({
                success: false,
                message: 'Karşılaştırma yapılamadı'
            });
        }
    }
}

module.exports = new StatsController(); 