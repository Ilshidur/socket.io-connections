const EventEmitter = require('events');

class Metric {
  constructor(model) {
    this.model = model;
    this.labels = {}
  }

  addLabel(name, fn) {
    this.labels[name] = fn;
    this.model.labelNames.push(name);
  }
}

function createConnectionsCountMetric(Prometheus, prefix) {
  const model = new Prometheus.Gauge({
    name: `${prefix}_socket_io_connections_count_total`,
    help: 'Total socket.io connections count',
    labelNames: [],
  });

  const metric = new Metric(model);
  metric.addLabel('namespace', socket => socket.nsp.name);
  return metric;
}

function updateConnectedAppsCount(socket) {
  const sockets = Object.values(socket.nsp.connected);
  this.emit('connections-count-change', sockets.length, socket);
  this.metrics.connectionsCount
    .labels(...Object.values(this.metrics.connectionsCount.labels).map(fn => fn(socket)))
    .set(sockets.length);
}

module.exports = class SocketMonitoring extends EventEmitter {
  constructor(io, { namespaces = null, prometheus = null } = {}) {
    super();
    this.io = io;
    this.namespaces = namespaces;

    if (prometheus) {
      this.metrics = {
        connectionsCount: createConnectionsCountMetric(prometheus.client, prometheus.prefix)
      };
    }
  }

  start() {
    const namespaces = this.io.of(this.namespaces || '/');

    namespaces.on('connect', (socket) => {
      updateConnectedAppsCount.call(this, socket);

      socket.on('disconnect', async (reason) => {
        updateConnectedAppsCount.call(this, socket);
      });
    });
  }
};
