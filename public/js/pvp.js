// PvP Battle Handler
class PVPBattle {
  constructor(matchId, player1, player2, player1CardId, player2CardId) {
    this.matchId = matchId;
    this.player1 = player1;
    this.player2 = player2;
    this.player1CardId = player1CardId;
    this.player2CardId = player2CardId;
    this.status = 'starting';
    this.battleLog = [];
    this.turn = 0;
    this.isLocalPlayer1 = player1.userId === S.userId;
  }

  // Get player's perspective
  getPlayerPerspective() {
    if (this.isLocalPlayer1) {
      return { self: this.player1, opponent: this.player2, selfCardId: this.player1CardId, opponentCardId: this.player2CardId };
    } else {
      return { self: this.player2, opponent: this.player1, selfCardId: this.player2CardId, opponentCardId: this.player1CardId };
    }
  }

  // Record action in battle log
  addLog(message) {
    this.battleLog.push({
      turn: this.turn,
      timestamp: Date.now(),
      message
    });
  }

  // Get battle summary
  getSummary() {
    return {
      matchId: this.matchId,
      player1: { name: this.player1.username, cardId: this.player1CardId },
      player2: { name: this.player2.username, cardId: this.player2CardId },
      turn: this.turn,
      status: this.status,
      logSize: this.battleLog.length
    };
  }
}

// Global PVP battle instance
let currentPVPBattle = null;
