// controllers/transferController.js

const Player = require("../models/Player");
const Team = require("../models/Team");
const transferService = require("../services/transferService");

class TransferController {
  /**
   * Transfer önerilerini getir
   * GET /api/transfers/suggestions
   */
  async getSuggestions(req, res) {
    try {
      const { team_id, position, min_budget, max_budget } = req.query;

      const team = await Team.findByPk(team_id);
      if (!team) {
        return res.status(404).json({ message: "Takım bulunamadı" });
      }

      const suggestions = await transferService.calculateSuggestions({
        team,
        position,
        minBudget: min_budget,
        maxBudget: max_budget,
      });

      return res.status(200).json({
        team,
        suggestions,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Oyuncu karşılaştırması
   * GET /api/transfers/compare
   */
  async comparePlayers(req, res) {
    try {
      const { player1_id, player2_id } = req.query;

      const player1 = await Player.findByPk(player1_id, {
        include: ["stats", "team"],
      });
      const player2 = await Player.findByPk(player2_id, {
        include: ["stats", "team"],
      });

      if (!player1 || !player2) {
        return res.status(404).json({ message: "Oyuncu bulunamadı" });
      }

      const comparison = await transferService.comparePlayerStats(
        player1,
        player2
      );

      return res.status(200).json({
        player1,
        player2,
        comparison,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  /**
   * Takım transfer bütçesi analizi
   * GET /api/transfers/budget-analysis
   */
  async analyzeBudget(req, res) {
    try {
      const { team_id } = req.query;

      const team = await Team.findByPk(team_id);
      if (!team) {
        return res.status(404).json({ message: "Takım bulunamadı" });
      }

      const analysis = await transferService.analyzeBudget(team);

      return res.status(200).json({
        team,
        analysis,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TransferController();
