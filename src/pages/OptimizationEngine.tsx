import React, { useState, useCallback } from 'react';
import { 
  Zap, 
  Brain, 
  Target, 
  Activity, 
  Play, 
  Pause, 
  RefreshCw,
  TrendingUp,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Layers
} from 'lucide-react';
import { optimizePrompt } from '../utils/api';
import type { PromptOptimization } from '../types';

const OptimizationEngine: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [taskType, setTaskType] = useState('coding');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimization, setOptimization] = useState<PromptOptimization | null>(null);
  const [optimizationHistory, setOptimizationHistory] = useState<PromptOptimization[]>([]);

  const taskTypes = [
    { id: 'coding', label: 'Code Generation', icon: '💻' },
    { id: 'creative', label: 'Creative Writing', icon: '✍️' },
    { id: 'analysis', label: 'Data Analysis', icon: '📊' },
    { id: 'qa', label: 'Q&A/Explanation', icon: '❓' }
  ];

  const handleOptimize = useCallback(async () => {
    if (!originalPrompt.trim()) return;
    
    setIsOptimizing(true);
    try {
      const result = await optimizePrompt(originalPrompt, taskType);
      setOptimization(result);
      setOptimizationHistory(prev => [result, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  }, [originalPrompt, taskType]);

  const getPerformanceColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Optimization Engine</h1>
          <p className="text-gray-600 mt-1">AI-powered prompt optimization using reinforcement learning</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">RL Model v2.3.1</span>
          </div>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Configuration</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Task Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {taskTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setTaskType(type.id)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          taskType === type.id
                            ? 'bg-blue-50 border-blue-300 text-blue-700'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="text-lg mb-1">{type.icon}</div>
                        <div className="font-medium text-sm">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Prompt
                  </label>
                  <textarea
                    value={originalPrompt}
                    onChange={(e) => setOriginalPrompt(e.target.value)}
                    placeholder="Enter your prompt to optimize..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <button
                onClick={handleOptimize}
                disabled={!originalPrompt.trim() || isOptimizing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
              >
                {isOptimizing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Optimizing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Optimize Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Optimization Results */}
          {optimization && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Optimization Results</h2>
                <p className="text-sm text-gray-600 mt-1">ID: {optimization.optimization_id}</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="text-2xl font-bold text-green-600">
                      {(optimization.optimized_prompt.expected_performance_lift * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-green-700 mt-1">Expected Lift</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">
                      {(optimization.optimized_prompt.confidence_score * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-blue-700 mt-1">Confidence</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600">
                      {optimization.optimization_process.iterations_performed}
                    </div>
                    <div className="text-sm text-purple-700 mt-1">RL Iterations</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Original Prompt</h3>
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">{optimization.original_prompt.text}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-xs text-red-600">
                          Quality Score: {(optimization.original_prompt.quality_score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Optimized Prompt</h3>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">{optimization.optimized_prompt.text}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-green-600">
                          Improvements: {optimization.optimized_prompt.improvements_made.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Reward Components</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(optimization.optimization_process.reward_components).map(([key, value]) => (
                        <div key={key} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                          <div className={`text-lg font-semibold ${getPerformanceColor(value)}`}>
                            {(value * 100).toFixed(0)}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Real-time Metrics */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Performance</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Optimizations Today</span>
                <span className="font-semibold text-gray-900">47,832</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Improvement</span>
                <span className="font-semibold text-green-600">+42.3%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="font-semibold text-blue-600">96.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Latency</span>
                <span className="font-semibold text-gray-900">387ms</span>
              </div>
            </div>
          </div>

          {/* Model Status */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">RL Model Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Policy Network</span>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Value Function</span>
                <span className="text-sm font-medium text-green-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reward Model</span>
                <span className="text-sm font-medium text-yellow-600">Training</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Update</span>
                <span className="text-sm text-gray-900">2 min ago</span>
              </div>
            </div>
          </div>

          {/* Recent Optimizations */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent History</h3>
            <div className="space-y-3">
              {optimizationHistory.slice(0, 3).map((opt, index) => (
                <div key={opt.optimization_id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      {new Date(opt.created_at).toLocaleTimeString()}
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      +{(opt.optimized_prompt.expected_performance_lift * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 truncate">
                    {opt.original_prompt.text.substring(0, 50)}...
                  </p>
                </div>
              ))}
              {optimizationHistory.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No optimizations yet
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationEngine;