// API Client for Elementara
class APIClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  async request(method, endpoint, data = null) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (this.token) {
      options.headers.Authorization = `Bearer ${this.token}`;
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'API request failed');
      }

      return result;
    } catch (err) {
      console.error('API Error:', err);
      throw err;
    }
  }

  // Auth
  register(username, email, password) {
    return this.request('POST', '/auth/register', { username, email, password });
  }

  login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  }

  guestLogin() {
    return this.request('POST', '/auth/guest');
  }

  // Player
  getProfile() {
    return this.request('GET', '/player/profile');
  }

  getCollection() {
    return this.request('GET', '/player/collection');
  }

  upgradeCard(cardId) {
    return this.request('POST', `/player/collection/${cardId}/upgrade`);
  }

  // Battles
  createBattle(cardId, opponentId = null) {
    return this.request('POST', '/battles/create', { cardId, opponentId });
  }

  getBattle(battleId) {
    return this.request('GET', `/battles/${battleId}`);
  }

  getBattleHistory() {
    return this.request('GET', '/battles/history');
  }

  // Leaderboard
  getLeaderboard() {
    return this.request('GET', '/leaderboard');
  }

  // Campaign
  getCampaignProgress() {
    return this.request('GET', '/campaign/progress');
  }

  completeStage(stageKey, goldReward, xpReward) {
    return this.request('POST', `/campaign/stage/${stageKey}/complete`, {
      goldReward,
      xpReward,
    });
  }
}

const api = new APIClient();
