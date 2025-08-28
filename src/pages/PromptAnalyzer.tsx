import React, { useState } from 'react';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  ArrowRight,
  Target,
  MessageSquare,
  BookOpen,
  Clock
} from 'lucide-react';

const PromptAnalyzer: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        qualityScore: 0.72,
        improvements: [
          {
            type: 'specificity',
            severity: 'high',
            message: 'Add specific requirements and constraints',
            suggestion: 'Include programming language, data structures, or output format'
          },
          {
            type: 'context',
            severity: 'medium',
            message: 'Provide more context about the intended use case',
            suggestion: 'Explain the purpose, audience, or domain-specific requirements'
          },
          {
            type: 'clarity',
            severity: 'low',
            message: 'Consider breaking down complex instructions',
            suggestion: 'Use numbered steps or bullet points for multi-part requests'
          }
        ],
        metrics: {
          clarity: 0.85,
          completeness: 0.65,
          specificity: 0.58,
          context: 0.71
        },
        taskType: 'coding',
        complexity: 'medium',
        estimatedTokens: 125
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Prompt Analyzer</h1>
        <p className="text-gray-600 mt-1">Analyze prompt quality and get optimization suggestions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Input Prompt</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <button
              onClick={handleAnalyze}
              disabled={!prompt.trim() || isAnalyzing}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  <span>Analyze Prompt</span>
                </>
              )}
            </button>
          </div>

          {analysis && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Metrics</h3>
              <div className="space-y-3">
                {Object.entries(analysis.metrics).map(([metric, score]) => (
                  <div key={metric} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {metric}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (score as number) >= 0.8 ? 'bg-green-500' :
                            (score as number) >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(score as number) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(score as number)}`}>
                        {((score as number) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {analysis && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.qualityScore)}`}>
                      {(analysis.qualityScore * 100).toFixed(0)}%
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Quality Score</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{analysis.estimatedTokens}</div>
                    <div className="text-sm text-gray-600 mt-1">Est. Tokens</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Task Type:</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{analysis.taskType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Complexity:</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{analysis.complexity}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
                <div className="space-y-4">
                  {analysis.improvements.map((improvement: any, index: number) => (
                    <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(improvement.severity)}`}>
                      <div className="flex items-start space-x-3">
                        {improvement.severity === 'high' && <XCircle className="w-5 h-5 mt-0.5 text-red-600" />}
                        {improvement.severity === 'medium' && <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />}
                        {improvement.severity === 'low' && <CheckCircle className="w-5 h-5 mt-0.5 text-blue-600" />}
                        <div className="flex-1">
                          <p className="font-medium text-sm">{improvement.message}</p>
                          <p className="text-sm mt-1 opacity-80">{improvement.suggestion}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!analysis && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-8">
              <div className="text-center">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600 text-sm">
                  Enter a prompt in the text area and click analyze to get detailed quality assessment and improvement suggestions.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptAnalyzer;