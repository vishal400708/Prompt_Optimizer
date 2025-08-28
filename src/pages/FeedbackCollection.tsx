import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Star,
  Send,
  Filter,
  Download,
  BarChart3,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import type { FeedbackSession } from '../types';

const FeedbackCollection: React.FC = () => {
  const [feedbackSessions, setFeedbackSessions] = useState<FeedbackSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<FeedbackSession | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    feedback: '',
    clarity: 0,
    relevance: 0,
    completeness: 0
  });

  useEffect(() => {
    // Simulate loading feedback sessions
    const mockSessions: FeedbackSession[] = Array.from({ length: 15 }, (_, i) => ({
      session_id: `SES-${Date.now()}-${i}`,
      optimization_id: `OPT-${Date.now()}-${i}`,
      human_rating: Math.floor(Math.random() * 5) + 1,
      feedback_text: [
        'Great improvement in specificity and clarity',
        'The optimized prompt provided much better results',
        'Could use more context but overall good',
        'Excellent optimization, very clear instructions',
        'Good but slightly too verbose for my needs'
      ][Math.floor(Math.random() * 5)],
      user_id: `user_${Math.floor(Math.random() * 100)}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      quality_ratings: {
        clarity: Math.random() * 2 + 3,
        relevance: Math.random() * 2 + 3,
        completeness: Math.random() * 2 + 3
      }
    }));
    setFeedbackSessions(mockSessions);
  }, []);

  const handleSubmitFeedback = () => {
    if (!selectedSession || newFeedback.rating === 0) return;
    
    // Simulate feedback submission
    console.log('Submitting feedback:', newFeedback);
    setNewFeedback({
      rating: 0,
      feedback: '',
      clarity: 0,
      relevance: 0,
      completeness: 0
    });
    setSelectedSession(null);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredSessions = feedbackSessions.filter(session => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'high') return session.human_rating >= 4;
    if (filterStatus === 'low') return session.human_rating <= 2;
    return true;
  });

  const avgRating = feedbackSessions.length > 0 
    ? feedbackSessions.reduce((sum, session) => sum + session.human_rating, 0) / feedbackSessions.length
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Feedback Collection</h1>
          <p className="text-gray-600 mt-1">Collect and analyze human feedback for continuous improvement</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{feedbackSessions.length}</span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Total Feedback Sessions</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}</span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Average Rating</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {new Set(feedbackSessions.map(s => s.user_id)).size}
            </span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Unique Contributors</h3>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">89.3%</span>
          </div>
          <h3 className="text-sm text-gray-600 mt-4">Satisfaction Rate</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Feedback Sessions</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Feedback</option>
                <option value="high">High Rated (4-5★)</option>
                <option value="low">Low Rated (1-2★)</option>
              </select>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {filteredSessions.map((session) => (
              <div
                key={session.session_id}
                onClick={() => setSelectedSession(session)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedSession?.session_id === session.session_id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < session.human_rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-sm font-medium ${getRatingColor(session.human_rating)}`}>
                        {session.human_rating}/5
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{session.feedback_text}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>User: {session.user_id}</span>
                      <span>{new Date(session.timestamp).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Details */}
        <div className="space-y-6">
          {selectedSession ? (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Session ID</label>
                  <p className="text-sm font-mono text-gray-900">{selectedSession.session_id}</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Overall Rating</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedSession.human_rating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {selectedSession.human_rating}/5
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Quality Ratings</label>
                  <div className="space-y-2 mt-1">
                    {Object.entries(selectedSession.quality_ratings).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-gray-700">{key}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {value.toFixed(1)}/5
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Feedback</label>
                  <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                    {selectedSession.feedback_text}
                  </p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600">Timestamp</label>
                  <p className="text-sm text-gray-900">{new Date(selectedSession.timestamp).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Session</h3>
                <p className="text-gray-600 text-sm">
                  Click on a feedback session to view detailed information and quality ratings.
                </p>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = feedbackSessions.filter(s => s.human_rating === rating).length;
                const percentage = feedbackSessions.length > 0 ? (count / feedbackSessions.length) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-8">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{rating}</span>
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCollection;