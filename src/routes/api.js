const express = require('express');
const router = express.Router();

// İstatistikler
router.get('/stats/transfers', statsController.getTransferStats);
router.get('/stats/teams', statsController.getTeamComparison);
router.get('/stats/market-value', statsController.getMarketValueTrends);

// Gelişmiş Arama
router.post('/search/advanced', searchController.advancedSearch);
router.get('/search/suggestions', searchController.getSuggestions);

// Performans
router.get('/performance/player/:id', performanceController.getPlayerStats);
router.get('/performance/team/:id', performanceController.getTeamStats);

// Haberler
router.get('/news/latest', newsController.getLatest);
router.get('/news/transfers', newsController.getTransferNews);
router.get('/news/team/:id', newsController.getTeamNews);

module.exports = router; 