// Matchmaking system for multiplayer PvP battles
class MatchmakingQueue {
  constructor() {
    this.queue = [];
    this.matches = new Map();
  }

  // Add player to queue
  addPlayer(userId, username, cardId, level) {
    const player = {
      userId,
      username,
      cardId,
      level,
      joinedAt: Date.now(),
      rating: level * 10 // Simple ELO-like rating based on level
    };

    this.queue.push(player);
    console.log(`[MM] ${username} joined queue. Queue size: ${this.queue.length}`);
    
    // Try to match every time someone joins
    this.tryMatch();
    
    return player;
  }

  // Remove player from queue
  removePlayer(userId) {
    this.queue = this.queue.filter(p => p.userId !== userId);
    console.log(`[MM] Player removed from queue. Queue size: ${this.queue.length}`);
  }

  // Find best match for a player
  findMatch(player) {
    if (this.queue.length < 2) return null;

    // Remove the player from queue temporarily
    const otherPlayers = this.queue.filter(p => p.userId !== player.userId);
    
    if (otherPlayers.length === 0) return null;

    // Sort by rating difference (prefer close matches)
    const sorted = otherPlayers.sort((a, b) => {
      const diffA = Math.abs(a.rating - player.rating);
      const diffB = Math.abs(b.rating - player.rating);
      return diffA - diffB;
    });

    // If difference is too large (>30 levels), start a broader search
    const maxDiff = 30;
    const bestMatch = sorted.find(p => Math.abs(p.rating - player.rating) <= maxDiff * 10);
    
    return bestMatch || sorted[0]; // Return closest match or just first available
  }

  // Try to create matches
  tryMatch() {
    while (this.queue.length >= 2) {
      const player1 = this.queue[0];
      const player2 = this.findMatch(player1);

      if (!player2) break;

      // Remove both from queue
      this.queue = this.queue.filter(p => p.userId !== player1.userId && p.userId !== player2.userId);

      // Create match
      const matchId = `pvp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      this.matches.set(matchId, {
        id: matchId,
        player1,
        player2,
        createdAt: Date.now(),
        status: 'waiting'
      });

      console.log(`[MM] Match created: ${player1.username} vs ${player2.username}`);
      
      // Notify that a match was found
      window.dispatchEvent(new CustomEvent('matchFound', { 
        detail: { matchId, player1, player2 }
      }));
    }
  }

  // Get current match
  getMatch(matchId) {
    return this.matches.get(matchId);
  }

  // Get queue status
  getQueueStatus() {
    return {
      queueSize: this.queue.length,
      totalMatches: this.matches.size,
      estimatedWaitTime: this.queue.length > 0 ? Math.ceil(this.queue.length / 2) * 5 : 0
    };
  }
}

const matchmaking = new MatchmakingQueue();
