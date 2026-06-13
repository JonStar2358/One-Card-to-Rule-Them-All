// WebSocket Client for real-time battles
class BattleSocket {
  constructor(url = 'ws://localhost:3000') {
    this.url = url;
    this.socket = null;
    this.callbacks = {};
    this.connect();
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener('open', () => {
      console.log('WebSocket connected');
      this.emit('connected');
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('WebSocket message:', data);
        this.emit(data.type, data);
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    });

    this.socket.addEventListener('close', () => {
      console.log('WebSocket disconnected');
      this.emit('disconnected');
      // Attempt reconnect in 3 seconds
      setTimeout(() => this.connect(), 3000);
    });

    this.socket.addEventListener('error', (err) => {
      console.error('WebSocket error:', err);
      this.emit('error', err);
    });
  }

  send(type, data = {}) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type, ...data }));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  on(event, callback) {
    if (!this.callbacks[event]) {
      this.callbacks[event] = [];
    }
    this.callbacks[event].push(callback);
  }

  emit(event, data) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach((cb) => cb(data));
    }
  }

  joinBattle(battleId) {
    this.send('join_battle', { battleId });
  }

  sendAction(battleId, action) {
    this.send('battle_action', { battleId, action });
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const battleSocket = new BattleSocket();
