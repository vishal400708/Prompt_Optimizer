import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  Copy, 
  Check,
  Play,
  Download,
  Search,
  Filter,
  ExternalLink,
  Terminal,
  Key,
  Shield,
  Zap
} from 'lucide-react';

const APIDocumentation: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('optimize');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const endpoints = [
    {
      id: 'optimize',
      method: 'POST',
      path: '/api/v1/optimize',
      title: 'Optimize Prompt',
      description: 'Submit a prompt for AI-powered optimization using reinforcement learning',
      category: 'Core'
    },
    {
      id: 'analyze',
      method: 'POST',
      path: '/api/v1/analyze',
      title: 'Analyze Prompt',
      description: 'Get quality assessment and improvement suggestions for a prompt',
      category: 'Analysis'
    },
    {
      id: 'feedback',
      method: 'POST',
      path: '/api/v1/feedback',
      title: 'Submit Feedback',
      description: 'Provide human feedback on optimization results',
      category: 'Feedback'
    },
    {
      id: 'metrics',
      method: 'GET',
      path: '/api/v1/metrics',
      title: 'Get Metrics',
      description: 'Retrieve performance metrics and analytics data',
      category: 'Analytics'
    },
    {
      id: 'models',
      method: 'GET',
      path: '/api/v1/models',
      title: 'List Models',
      description: 'Get information about available AI models and their status',
      category: 'Models'
    }
  ];

  const codeExamples = {
    optimize: {
      curl: `curl -X POST https://api.promptoptim.ai/v1/optimize \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write code for sorting",
    "task_type": "coding",
    "optimization_level": "aggressive"
  }'`,
      javascript: `const response = await fetch('https://api.promptoptim.ai/v1/optimize', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Write code for sorting',
    task_type: 'coding',
    optimization_level: 'aggressive'
  })
});

const result = await response.json();
console.log(result);`,
      python: `import requests

url = "https://api.promptoptim.ai/v1/optimize"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "prompt": "Write code for sorting",
    "task_type": "coding",
    "optimization_level": "aggressive"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()
print(result)`
    },
    analyze: {
      curl: `curl -X POST https://api.promptoptim.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Write code for sorting"
  }'`,
      javascript: `const response = await fetch('https://api.promptoptim.ai/v1/analyze', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    prompt: 'Write code for sorting'
  })
});

const analysis = await response.json();`,
      python: `import requests

response = requests.post(
    "https://api.promptoptim.ai/v1/analyze",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"prompt": "Write code for sorting"}
)
analysis = response.json()`
    }
  };

  const handleCopyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(`${selectedEndpoint}-${type}`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);
  const selectedExamples = codeExamples[selectedEndpoint as keyof typeof codeExamples];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="text-gray-600 mt-1">Complete reference for the PromptOptim AI API</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Key className="w-4 h-4" />
            <span>Get API Key</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Download SDK</span>
          </button>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Quick Start</h2>
            <p className="text-gray-600">Get started with the PromptOptim AI API in minutes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Key className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-900">1. Get API Key</span>
            </div>
            <p className="text-sm text-gray-600">Sign up and generate your API key from the dashboard</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-900">2. Make Request</span>
            </div>
            <p className="text-sm text-gray-600">Send your first prompt optimization request</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <Play className="w-4 h-4 text-purple-600" />
              <span className="font-medium text-gray-900">3. Get Results</span>
            </div>
            <p className="text-sm text-gray-600">Receive optimized prompts with performance metrics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Endpoint List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Endpoints</h3>
            </div>
            <div className="p-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => setSelectedEndpoint(endpoint.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors mb-1 ${
                    selectedEndpoint === endpoint.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="text-xs text-gray-500">{endpoint.category}</span>
                  </div>
                  <div className="font-medium text-sm">{endpoint.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Endpoint Details */}
        <div className="lg:col-span-3 space-y-6">
          {selectedEndpointData && (
            <>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded ${
                    selectedEndpointData.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {selectedEndpointData.method}
                  </span>
                  <code className="text-lg font-mono text-gray-900">{selectedEndpointData.path}</code>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEndpointData.title}</h2>
                <p className="text-gray-600">{selectedEndpointData.description}</p>
              </div>

              {/* Request/Response Examples */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Code Examples</h3>
                </div>
                <div className="p-6 space-y-6">
                  {selectedExamples && Object.entries(selectedExamples).map(([lang, code]) => (
                    <div key={lang} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900 capitalize">{lang === 'curl' ? 'cURL' : lang}</h4>
                        <button
                          onClick={() => handleCopyCode(code, lang)}
                          className="flex items-center space-x-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          {copiedCode === `${selectedEndpoint}-${lang}` ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span>{copiedCode === `${selectedEndpoint}-${lang}` ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{code}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Schema */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Response Schema</h3>
                </div>
                <div className="p-6">
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{JSON.stringify({
                      optimization_id: "OPT-2025-001234",
                      original_prompt: {
                        text: "Write code for sorting",
                        quality_score: 0.3
                      },
                      optimized_prompt: {
                        text: "Write a Python function implementing efficient sorting...",
                        confidence_score: 0.94,
                        expected_performance_lift: 0.67
                      },
                      performance_metrics: {
                        optimization_latency_ms: 340,
                        total_api_response_time_ms: 445
                      }
                    }, null, 2)}</code>
                  </pre>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Authentication & Rate Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Authentication</h3>
          </div>
          <div className="space-y-3">
            <p className="text-gray-600 text-sm">All API requests require authentication using your API key in the Authorization header:</p>
            <pre className="bg-gray-900 text-gray-100 p-3 rounded text-sm">
              <code>Authorization: Bearer YOUR_API_KEY</code>
            </pre>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                <strong>Security:</strong> Never expose your API key in client-side code. Always make requests from your server.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Terminal className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Rate Limits</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Free Tier:</span>
                <span className="ml-2 font-medium">100 req/hour</span>
              </div>
              <div>
                <span className="text-gray-600">Pro Tier:</span>
                <span className="ml-2 font-medium">1,000 req/hour</span>
              </div>
              <div>
                <span className="text-gray-600">Enterprise:</span>
                <span className="ml-2 font-medium">Custom limits</span>
              </div>
              <div>
                <span className="text-gray-600">Burst:</span>
                <span className="ml-2 font-medium">10x for 1 minute</span>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                Rate limit headers are included in all responses to help you track usage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;