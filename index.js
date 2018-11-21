const SocketMonitoring = require('socket.io-connections');

const Prometheus = require('./metrics');
const { client: redisClient } = require('./redis');

const { PREFIX, connectedApplicationsMetric } = Prometheus;

// The amount of connected applications is stored in Redis.
// Each time an app connects/disconnects, the total count will be updated and
// monitored by Prometheus.

function collectSocketsMetrics(io) {
  const monitoring = new SocketMonitoring(io, {
    namespaces: /^\/app-official|\/lib*/,
    prometheus: {
      prefix: PREFIX,
      client: Prometheus,
    },
  });

  monitoring.metrics.connectionsCount.addLabel('version', socket => socket.handshake.query.appVersion || '(unknown version)');

  monitoring.on('connections-count-change', async (count, socket) => {
    const appVersion = socket.handshake.query.appVersion || '(unknown version)';
    const namespaceName = socket.nsp.name;

    connectedApplicationsMetric
      .labels(appVersion, namespaceName)
      .set(count);
    await redisClient.setAsync('total_connected_apps_count', count);
  });

  // TODO:
  monitoring.on('emit', () => {});
  monitoring.on('receive', () => {});

  monitoring.start();
}

module.exports = { collectSocketsMetrics };
