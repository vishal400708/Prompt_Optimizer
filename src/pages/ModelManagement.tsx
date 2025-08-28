import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Activity, 
  Settings, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  BarChart3,
  Clock,
  Cpu,
  Network,
  HardDrive
} from 'lucide-react';
import { fetchModelMetrics } from '../utils/api';
import type { ModelMetrics } from '../types';

const ModelManagement: React.FC = () => {
  const [models, setModels] = useState<ModelMetrics[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadModelMetrics();
  }, []);

  const loadModelMetrics = async () => {
    setIsLoading(true);
    try {
      const metrics = await fetchModelMetrics();
      setModels(metrics);
    } catch (error) {
      console.error('Failed to load model metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600 bg-green-50 border-green-200';
      case 'degraded': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircle;
      case 'degraded': return AlertTriangle;
      case 'error': return XCircle;
      default: return Activity;
    }
  };

  const getPerformanceColor = (value: number, metric: string) => {
    switch (metric) {
      case 'accuracy':
        if (value >= 0.95) return 'text-green-600';
        if (value >= 0.9) return 'text-yellow-600';
        return 'text-red-600';
      case 'uptime':
        if (value >= 99) return 'text-green-600';
        if (value >= 95) return 'text-yellow-600';
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Model Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage AI model performance and health</p>
        </div>
        <button
          onClick={loadModelMetrics}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{models.length}</span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Active Models</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {models.filter(m => m.status === 'healthy').length}
            </span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Healthy Models</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
              <Cpu className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {models.reduce((sum, m) => sum + m.performance.throughput, 0).toLocaleString()}
            </span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Total Throughput/min</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {Math.round(models.reduce((sum, m) => sum + m.performance.latency_p95, 0) / models.length || 0)}ms
            </span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Avg P95 Latency</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Model List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Model Overview</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {models.map((model) => {
              const StatusIcon = getStatusIcon(model.status);
              return (
                <div
                  key={model.model_id}
                  onClick={() => setSelectedModel(model)}
                  className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedModel?.model_id === model.model_id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{model.name}</h3>
                        <span className="text-sm text-gray-500">{model.version}</span>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(model.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {model.status}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Throughput:</span>
                          <span className="ml-2 font-medium">{model.performance.throughput}/min</span>
                        </div>
                        <div>
                          <span className="text-gray-600">P95 Latency:</span>
                          <span className="ml-2 font-medium">{model.performance.latency_p95}ms</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Accuracy:</span>
                          <span className={`ml-2 font-medium ${getPerformanceColor(model.performance.accuracy, 'accuracy')}`}>
                            {(model.performance.accuracy * 100).toFixed(1)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Uptime:</span>
                          <span className={`ml-2 font-medium ${getPerformanceColor(model.performance.uptime, 'uptime')}`}>
                            {model.performance.uptime.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Model Details */}
        <div className="space-y-6">
          {selectedModel ? (
            <>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600">Model Name</label>
                    <p className="text-lg font-semibold text-gray-900">{selectedModel.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600">Version</label>
                    <p className="text-sm font-mono text-gray-900">{selectedModel.version}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600">Status</label>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedModel.status)}`}>
                      {React.createElement(getStatusIcon(selectedModel.status), { className: 'w-3 h-3 mr-1' })}
                      {selectedModel.status}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-600">Last Updated</label>
                    <p className="text-sm text-gray-900">{new Date(selectedModel.last_updated).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Throughput</span>
                      <span className="text-sm font-medium text-gray-900">{selectedModel.performance.throughput}/min</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${Math.min(selectedModel.performance.throughput / 10, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Accuracy</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(selectedModel.performance.accuracy, 'accuracy')}`}>
                        {(selectedModel.performance.accuracy * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${selectedModel.performance.accuracy * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Uptime</span>
                      <span className={`text-sm font-medium ${getPerformanceColor(selectedModel.performance.uptime, 'uptime')}`}>
                        {selectedModel.performance.uptime.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${selectedModel.performance.uptime}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">P95 Latency</span>
                      <span className="text-sm font-medium text-gray-900">{selectedModel.performance.latency_p95}ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${Math.max(0, 100 - (selectedModel.performance.latency_p95 / 5))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Play className="w-4 h-4" />
                    <span>Deploy Update</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                    <Pause className="w-4 h-4" />
                    <span>Scale Down</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="text-center">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Model</h3>
                <p className="text-gray-600 text-sm">
                  Click on a model to view detailed performance metrics and management options.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelManagement;