const EventEmitter = require('events');

function updateConnectedAppsCount(socket) {
  const sockets = Object.values(socket.nsp.connected);

  this.emit('connections-count-change', sockets.length, socket);
}

module.exports = class SocketMonitoring extends EventEmitter {
  constructor(io, { namespaces = null } = {}) {
    this.io = io;
    this.namespaces = namespaces;
  }

  start() {
    const namespaces = this.io.of(this.namespaces || '/');

    namespaces.on('connect', (socket) => {
      updateConnectedAppsCount.call(this, socket);
  
      socket.on('disconnect', async (reason) => {
        updateConnectedAppsCount.call(this, socket);
      });
    });
  }
};
