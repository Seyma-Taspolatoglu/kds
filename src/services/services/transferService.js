// services/transferService.js

const Player = require("../models/Player");

class TransferService {
  /**
   * Transfer önerileri hesapla
   */
  async calculateSuggestions({ team, position, minBudget, maxBudget }) {
    // 🔴 İŞ KURALI 1:
    // Takım bütçesi minimum bütçeden küçükse transfer yapılamaz
    if (team.budget < minBudget) {
      throw new Error("Takım bütçesi belirtilen minimum bütçeden yetersiz");
    }

    // 🔴 İŞ KURALI 2:
    // Aynı pozisyonda 3 veya daha fazla oyuncu varsa transfer önerilmez
    const existingPlayersCount = await Player.count({
      where: {
        teamId: team.id,
        position: position,
      },
    });

    if (existingPlayersCount >= 3) {
      throw new Error(
        "Takımda bu pozisyonda yeterli sayıda oyuncu bulunmaktadır"
      );
    }

    const players = await Player.findAll({
      where: {
        position: position,
        marketValue: {
          $gte: minBudget,
          $lte: maxBudget,
        },
      },
    });

    return players;
  }

  /**
   * Oyuncu karşılaştırması
   */
  comparePlayerStats(player1, player2) {
    return {
      player1Score: player1.stats.rating,
      player2Score: player2.stats.rating,
      betterPlayer:
        player1.stats.rating > player2.stats.rating
          ? player1.name
          : player2.name,
    };
  }

  /**
   * Takım bütçe analizi
   */
  analyzeBudget(team) {
    return {
      totalBudget: team.budget,
      transferLimit: team.budget * 0.3,
      riskLevel: team.budget < 1_000_000 ? "Yüksek Risk" : "Düşük Risk",
    };
  }
}

module.exports = new TransferService();

