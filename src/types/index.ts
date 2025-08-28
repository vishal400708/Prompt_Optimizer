export interface PromptOptimization {
  optimization_id: string;
  original_prompt: {
    text: string;
    task_type: string;
    context_length: number;
    quality_score: number;
  };
  optimized_prompt: {
    text: string;
    improvements_made: string[];
    confidence_score: number;
    expected_performance_lift: number;
  };
  optimization_process: {
    rl_model_version: string;
    iterations_performed: number;
    convergence_time_ms: number;
    reward_components: {
      task_performance: number;
      human_preference: number;
      efficiency: number;
    };
  };
  evaluation_results: {
    a_b_test_id: string;
    performance_metrics: {
      downstream_accuracy: number;
      user_satisfaction: number;
      response_quality: number;
    };
    statistical_significance: {
      p_value: number;
      effect_size: number;
      confidence_interval: [number, number];
    };
  };
  feedback_data: {
    human_ratings: number[];
    automated_scores: {
      clarity: number;
      completeness: number;
      specificity: number;
    };
    collection_timestamp: string;
  };
  performance_metrics: {
    optimization_latency_ms: number;
    model_inference_time_ms: number;
    total_api_response_time_ms: number;
  };
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
}

export interface ModelMetrics {
  model_id: string;
  name: string;
  version: string;
  status: 'healthy' | 'degraded' | 'error';
  performance: {
    throughput: number;
    latency_p95: number;
    accuracy: number;
    uptime: number;
  };
  last_updated: string;
}

export interface FeedbackSession {
  session_id: string;
  optimization_id: string;
  human_rating: number;
  feedback_text: string;
  user_id: string;
  timestamp: string;
  quality_ratings: {
    clarity: number;
    relevance: number;
    completeness: number;
  };
}

export interface PerformanceData {
  timestamp: string;
  optimizations_processed: number;
  average_improvement: number;
  success_rate: number;
  latency_p95: number;
}