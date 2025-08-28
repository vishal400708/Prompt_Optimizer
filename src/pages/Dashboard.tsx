import React from 'react';
import { 
  TrendingUp, 
  Zap, 
  Users, 
  Target, 
  ArrowUp, 
  ArrowDown,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import MetricCard from '../components/MetricCard';
import Chart from '../components/Chart';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Daily Optimizations',
      value: '1,247,832',
      change: 12.5,
      trend: 'up' as const,
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Avg Performance Lift',
      value: '42.3%',
      change: 3.2,
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Active Users',
      value: '25,847',
      change: -2.1,
      trend: 'down' as const,
      icon: Users,
      color: 'purple'
    },
    {
      title: 'System Accuracy',
      value: '96.7%',
      change: 0.8,
      trend: 'up' as const,
      icon: Target,
      color: 'orange'
    }
  ];

  const recentOptimizations = [
    {
      id: 'OPT-2025-001234',
      original: 'Write code for sorting',
      optimized: 'Write a Python function implementing efficient sorting with error handling...',
      improvement: 67,
      status: 'completed',
      timestamp: '2 min ago'
    },
    {
      id: 'OPT-2025-001235',
      original: 'Make a website',
      optimized: 'Create a responsive web application using React and Tailwind CSS...',
      improvement: 89,
      status: 'completed',
      timestamp: '5 min ago'
    },
    {
      id: 'OPT-2025-001236',
      original: 'Analyze this data',
      optimized: 'Perform comprehensive data analysis including statistical tests...',
      improvement: 45,
      status: 'processing',
      timestamp: '8 min ago'
    }
  ];

  const systemStatus = [
    { service: 'Prompt Analyzer', status: 'healthy', uptime: '99.98%' },
    { service: 'RL Engine', status: 'healthy', uptime: '99.95%' },
    { service: 'Feedback System', status: 'warning', uptime: '99.89%' },
    { service: 'API Gateway', status: 'healthy', uptime: '99.99%' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your prompt optimization performance</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: 30 seconds ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Performance Trends</h2>
            <p className="text-sm text-gray-600">Optimization success rate over time</p>
          </div>
          <div className="p-6">
            <Chart />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">System Status</h2>
            <p className="text-sm text-gray-600">Service health and uptime</p>
          </div>
          <div className="p-6 space-y-4">
            {systemStatus.map((service, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {service.status === 'healthy' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : service.status === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Activity className="w-5 h-5 text-red-500" />
                  )}
                  <span className="font-medium text-gray-900">{service.service}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-900">{service.uptime}</span>
                  <p className="text-xs text-gray-500">uptime</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Optimizations</h2>
          <p className="text-sm text-gray-600">Latest prompt optimizations processed by the system</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Optimization ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Original Prompt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Improvement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOptimizations.map((opt) => (
                <tr key={opt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {opt.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {opt.original}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      +{opt.improvement}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      opt.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {opt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opt.timestamp}
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

export default Dashboard;