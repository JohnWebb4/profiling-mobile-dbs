// @flow
const PERFOMANCE_EVENTS = {
  inMemoryWrite: 'inMemoryWrite',
  realmWrite: 'realmWrite',
  watermelonWrite: 'watermelonWrite',
};

const METRIC_NAME = {
  memory: 'Memory',
  realm: 'Realm',
  watermelon: 'Watermelon',
};

class PerformanceService {
  metrics;
  setMetrics;

  initDataSets(metrics, setMetrics) {
    // Debate editing hooks in a service
    this.metrics = metrics;
    this.setMetrics = setMetrics;
  }

  clearEvent(event: string) {
    let metricName;

    if (event === PERFOMANCE_EVENTS.inMemoryWrite) {
      metricName = METRIC_NAME.memory;
    } else if (event === PERFOMANCE_EVENTS.realmWrite) {
      metricName = METRIC_NAME.realm;
    } else if (event === PERFOMANCE_EVENTS.watermelonWrite) {
      metricName = METRIC_NAME.watermelon;
    }

    let metric = this.getDataset(metricName);

    console.log('clear event', metricName);

    if (metric) {
      while (metric.data.length > 0) {
        metric.data.pop();
      }
      metric.startTime = undefined;
    }
  }

  getChartColor(metricName) {
    if (metricName === METRIC_NAME.memory) {
      return 'rgba(200, 0, 0, 1)';
    } else if (metricName === METRIC_NAME.realm) {
      return 'rgba(0, 200, 0, 1)';
    } else if (metricName === METRIC_NAME.watermelon) {
      return 'rgba(200, 200, 0, 1)';
    }

    return 'rgba(0, 0, 0, 1)';
  }

  getDataset(metricName: string) {
    return this.metrics.filter(({name}) => name === metricName)[0];
  }

  getOrCreateDataset(metricName: string) {
    let metric = this.getDataset(metricName);

    if (!metric) {
      metric = {
        name: metricName,
        color: () => this.getChartColor(metricName),
        data: [],
      };

      this.metrics.push(metric);
    }

    return metric;
  }

  trackEvent(event: string) {
    let metricName;

    if (event === PERFOMANCE_EVENTS.inMemoryWrite) {
      metricName = METRIC_NAME.memory;
    } else if (event === PERFOMANCE_EVENTS.realmWrite) {
      metricName = METRIC_NAME.realm;
    } else if (event === PERFOMANCE_EVENTS.watermelonWrite) {
      metricName = METRIC_NAME.watermelon;
    }

    const metric = this.getOrCreateDataset(metricName);

    if (metric.data.length > 0) {
      const currentTime = Date.now();
      const startTime = metric.startTime;
      const diffTime = currentTime - startTime;

      metric.data.push(diffTime / 1000);
    } else {
      // First is always zero
      metric.data.push(0);
      metric.startTime = Date.now();
    }

    this.setMetrics(this.metrics);
  }
}

const performanceService = new PerformanceService();

export {performanceService, PERFOMANCE_EVENTS};
