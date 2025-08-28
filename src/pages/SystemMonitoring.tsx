import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Server, 
  Database, 
  Network,
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  Cpu,
  HardDrive,
  Wifi,
  Zap
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  threshold: number;
}

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  endpoint: string;
}

const SystemMonitoring: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU Usage',
      value: 67.3,
      unit: '%',
      status: 'warning',
      trend: 'up',
      threshold: 80
    },
    {
      name: 'Memory Usage',
      value: 45.8,
      unit: '%',
      status: 'healthy',
      trend: 'stable',
      threshold: 85
    },
    {
      name: 'Disk Usage',
      value: 23.1,
      unit: '%',
      status: 'healthy',
      trend: 'up',
      threshold: 90
    },
    {
      name: 'Network I/O',
      value: 156.7,
      unit: 'MB/s',
      status: 'healthy',
      trend: 'down',
      threshold: 500
    }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    {
      name: 'Optimization API',
      status: 'healthy',
      uptime: 99.98,
      responseTime: 245,
      lastCheck: '30 seconds ago',
      endpoint: '/api/v1/optimize'
    },
    {
      name: 'Analysis Service',
      status: 'healthy',
      uptime: 99.95,
      responseTime: 189,
      lastCheck: '30 seconds ago',
      endpoint: '/api/v1/analyze'
    },
    {
      name: 'RL Training Engine',
      status: 'degraded',
      uptime: 98.7,
      responseTime: 1250,
      lastCheck: '1 minute ago',
      endpoint: '/internal/rl-engine'
    },
    {
      name: 'Feedback Collector',
      status: 'healthy',
      uptime: 99.99,
      responseTime: 156,
      lastCheck: '30 seconds ago',
      endpoint: '/api/v1/feedback'
    },
    {
      name: 'Model Registry',
      status: 'healthy',
      uptime: 99.92,
      responseTime: 89,
      lastCheck: '30 seconds ago',
      endpoint: '/api/v1/models'
    },
    {
      name: 'Analytics DB',
      status: 'down',
      uptime: 95.2,
      responseTime: 0,
      lastCheck: '5 minutes ago',
      endpoint: '/internal/analytics-db'
    }
  ]);

  const [alerts] = useState([
    {
      id: 1,
      severity: 'critical',
      message: 'Analytics DB connection lost',
      timestamp: '2 minutes ago',
      service: 'Analytics DB'
    },
    {
      id: 2,
      severity: 'warning',
      message: 'RL Training Engine high latency detected',
      timestamp: '5 minutes ago',
      service: 'RL Training Engine'
    },
    {
      id: 3,
      severity: 'warning',
      message: 'CPU usage above 65% threshold',
      timestamp: '8 minutes ago',
      service: 'System'
    }
  ]);

  const refreshMetrics = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 10,
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable'
      })));
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'down': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'warning': case 'degraded': return AlertTriangle;
      case 'critical': case 'down': return XCircle;
      default: return Activity;
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'cpu usage': return Cpu;
      case 'memory usage': return Server;
      case 'disk usage': return HardDrive;
      case 'network i/o': return Wifi;
      default: return Activity;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      default: return Activity;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time system health and performance monitoring</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="5m">Last 5 minutes</option>
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </select>
          <button
            onClick={refreshMetrics}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemMetrics.map((metric) => {
          const Icon = getMetricIcon(metric.name);
          const TrendIcon = getTrendIcon(metric.trend);
          
          return (
            <div key={metric.name} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg border ${
                  metric.status === 'healthy' ? 'bg-green-50 border-green-200' :
                  metric.status === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    metric.status === 'healthy' ? 'text-green-600' :
                    metric.status === 'warning' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendIcon className={`w-4 h-4 ${
                    metric.trend === 'up' ? 'text-red-500' :
                    metric.trend === 'down' ? 'text-green-500' :
                    'text-gray-400'
                  }`} />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {metric.value.toFixed(1)}{metric.unit}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{metric.name}</p>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        metric.status === 'healthy' ? 'bg-green-500' :
                        metric.status === 'warning' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Threshold: {metric.threshold}{metric.unit}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Status */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Service Status</h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Healthy ({services.filter(s => s.status === 'healthy').length})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Degraded ({services.filter(s => s.status === 'degraded').length})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Down ({services.filter(s => s.status === 'down').length})</span>
                </div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {services.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(service.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {service.status}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">{service.endpoint}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Uptime</span>
                          <p className="font-medium text-gray-900">{service.uptime.toFixed(2)}%</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Response</span>
                          <p className="font-medium text-gray-900">
                            {service.responseTime > 0 ? `${service.responseTime}ms` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Last Check</span>
                          <p className="font-medium text-gray-900">{service.lastCheck}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.severity === 'critical' ? 'bg-red-50 border-red-200' :
                    alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {alert.severity === 'critical' ? (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium text-sm ${
                        alert.severity === 'critical' ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {alert.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-600">{alert.service}</span>
                        <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-4 h-4" />
                <span>Restart Services</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Configure Alerts</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <Database className="w-4 h-4" />
                <span>Database Health</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;