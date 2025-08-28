import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Download,
  Filter,
  RefreshCw,
  Target,
  Clock,
  Zap,
  Users
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { fetchPerformanceMetrics } from '../utils/api';
import type { PerformanceData } from '../types';

const PerformanceAnalytics: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPerformanceData();
  }, [timeRange]);

  const loadPerformanceData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchPerformanceMetrics();
      setPerformanceData(data);
    } catch (error) {
      console.error('Failed to load performance data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const aggregatedMetrics = performanceData.reduce(
    (acc, data) => {
      acc.totalOptimizations += data.optimizations_processed;
      acc.avgImprovement += data.average_improvement;
      acc.avgSuccessRate += data.success_rate;
      acc.avgLatency += data.latency_p95;
      return acc;
    },
    { totalOptimizations: 0, avgImprovement: 0, avgSuccessRate: 0, avgLatency: 0 }
  );

  if (performanceData.length > 0) {
    aggregatedMetrics.avgImprovement /= performanceData.length;
    aggregatedMetrics.avgSuccessRate /= performanceData.length;
    aggregatedMetrics.avgLatency /= performanceData.length;
  }

  const chartData = performanceData.map(data => ({
    ...data,
    date: new Date(data.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor optimization performance and system metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button
            onClick={loadPerformanceData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {aggregatedMetrics.totalOptimizations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Optimizations</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {aggregatedMetrics.avgImprovement.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Improvement</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {aggregatedMetrics.avgSuccessRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(aggregatedMetrics.avgLatency)}ms
              </div>
              <div className="text-sm text-gray-600">Avg Latency (P95)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Optimization Volume */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Optimization Volume</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [value.toLocaleString(), 'Optimizations']}
              />
              <Area 
                type="monotone" 
                dataKey="optimizations_processed" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Improvement */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Improvement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Improvement']}
              />
              <Line 
                type="monotone" 
                dataKey="average_improvement" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Rate Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[85, 100]} />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Success Rate']}
              />
              <Area 
                type="monotone" 
                dataKey="success_rate" 
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Latency Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">P95 Latency</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => [`${value}ms`, 'P95 Latency']}
              />
              <Bar dataKey="latency_p95" fill="#F97316" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Detailed Performance Data</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Optimizations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Improvement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P95 Latency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {performanceData.slice(0, 10).map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(data.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.optimizations_processed.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.average_improvement.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.success_rate.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {Math.round(data.latency_p95)}ms
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;