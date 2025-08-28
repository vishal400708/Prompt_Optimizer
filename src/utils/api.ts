// Simulated API functions for demonstration
export const optimizePrompt = async (prompt: string, taskType: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 3000 + 1000));
  
  const optimizationId = `OPT-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  
  return {
    optimization_id: optimizationId,
    original_prompt: {
      text: prompt,
      task_type: taskType,
      context_length: prompt.length,
      quality_score: Math.random() * 0.4 + 0.2 // 0.2 - 0.6
    },
    optimized_prompt: {
      text: generateOptimizedPrompt(prompt, taskType),
      improvements_made: getImprovements(prompt),
      confidence_score: Math.random() * 0.2 + 0.8, // 0.8 - 1.0
      expected_performance_lift: Math.random() * 0.5 + 0.3 // 0.3 - 0.8
    },
    optimization_process: {
      rl_model_version: "v2.3.1",
      iterations_performed: Math.floor(Math.random() * 20) + 5,
      convergence_time_ms: Math.floor(Math.random() * 500) + 200,
      reward_components: {
        task_performance: Math.random() * 0.3 + 0.7,
        human_preference: Math.random() * 0.3 + 0.7,
        efficiency: Math.random() * 0.3 + 0.7
      }
    },
    evaluation_results: {
      a_b_test_id: `ABT-${Math.random().toString(36).substr(2, 6)}`,
      performance_metrics: {
        downstream_accuracy: Math.random() * 0.2 + 0.8,
        user_satisfaction: Math.random() * 1 + 4,
        response_quality: Math.random() * 0.2 + 0.8
      },
      statistical_significance: {
        p_value: Math.random() * 0.01 + 0.001,
        effect_size: Math.random() * 0.5 + 0.3,
        confidence_interval: [0.15, 0.69] as [number, number]
      }
    },
    feedback_data: {
      human_ratings: [4, 5, 4, 5],
      automated_scores: {
        clarity: Math.random() * 0.2 + 0.8,
        completeness: Math.random() * 0.2 + 0.8,
        specificity: Math.random() * 0.2 + 0.8
      },
      collection_timestamp: new Date().toISOString()
    },
    performance_metrics: {
      optimization_latency_ms: Math.floor(Math.random() * 300) + 200,
      model_inference_time_ms: Math.floor(Math.random() * 100) + 50,
      total_api_response_time_ms: Math.floor(Math.random() * 400) + 300
    },
    status: 'completed' as const,
    created_at: new Date().toISOString()
  };
};

const generateOptimizedPrompt = (original: string, taskType: string): string => {
  const improvements: Record<string, string[]> = {
    coding: [
      "Specify the programming language and framework",
      "Include error handling requirements",
      "Request code documentation and comments",
      "Define expected input/output formats",
      "Specify performance requirements"
    ],
    creative: [
      "Define the target audience and tone",
      "Specify length and format requirements",
      "Include style and genre preferences",
      "Request specific themes or elements",
      "Define the intended use case"
    ],
    analysis: [
      "Specify the type of analysis required",
      "Define the expected output format",
      "Include methodology preferences",
      "Request specific metrics or insights",
      "Specify data interpretation requirements"
    ],
    qa: [
      "Provide context and background information",
      "Specify the level of detail required",
      "Include relevant constraints or assumptions",
      "Request supporting evidence or examples",
      "Define the target audience for the response"
    ]
  };

  const taskImprovements = improvements[taskType] || improvements.qa;
  const selectedImprovements = taskImprovements.slice(0, Math.floor(Math.random() * 3) + 2);
  
  return `${original}\n\n${selectedImprovements.map(imp => `- ${imp}`).join('\n')}`;
};

const getImprovements = (prompt: string): string[] => {
  const possibleImprovements = [
    "added_specificity",
    "included_requirements", 
    "requested_explanation",
    "added_context",
    "improved_clarity",
    "enhanced_structure",
    "added_constraints",
    "specified_format"
  ];
  
  return possibleImprovements.slice(0, Math.floor(Math.random() * 4) + 2);
};

export const fetchPerformanceMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Array.from({ length: 30 }, (_, i) => ({
    timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
    optimizations_processed: Math.floor(Math.random() * 50000) + 80000,
    average_improvement: Math.random() * 20 + 35,
    success_rate: Math.random() * 10 + 90,
    latency_p95: Math.random() * 200 + 300
  }));
};

export const fetchModelMetrics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const models = [
    'GPT-4 Turbo', 'Claude-3 Opus', 'Claude-3 Sonnet', 'Llama-2 70B',
    'GPT-3.5 Turbo', 'Gemini Pro', 'PaLM 2', 'Cohere Command'
  ];
  
  return models.map((name, i) => ({
    model_id: `model_${i}`,
    name,
    version: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
    status: Math.random() > 0.1 ? 'healthy' : (Math.random() > 0.5 ? 'degraded' : 'error') as const,
    performance: {
      throughput: Math.floor(Math.random() * 1000) + 500,
      latency_p95: Math.floor(Math.random() * 200) + 200,
      accuracy: Math.random() * 0.1 + 0.9,
      uptime: Math.random() * 2 + 98
    },
    last_updated: new Date().toISOString()
  }));
};