import React, { useState, useEffect } from 'react';
import { ArrowLeft, Code, MessageSquare, Loader2, TrendingUp, Award, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function InterviewResultsPage() {
  const [activeTab, setActiveTab] = useState('dsa');
  const [dsaResults, setDsaResults] = useState([]);
  const [behaviorResults, setBehaviorResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedFeedback, setExpandedFeedback] = useState(new Set());
  const {user}=useAuth();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get user from localStorage
      
      const userId = user?.id;

      if (!userId) {
        throw new Error('User not found. Please log in again.');
      }

      // Fetch DSA results
      const dsaResponse = await fetch(`${API_URL}/api/users/dsa-interviews/${userId}`, {
        credentials: 'include'
      });
      
      if (dsaResponse.ok) {
        const dsaData = await dsaResponse.json();
        setDsaResults(dsaData);
      }

      // Fetch Behavioral results
      const behaviorResponse = await fetch(`${API_URL}/api/users/behavior-interviews/${userId}`, {
        credentials: 'include'
      });
      
      if (behaviorResponse.ok) {
        const behaviorData = await behaviorResponse.json();
        setBehaviorResults(behaviorData);
      }

    } catch (err) {
      console.error('Error fetching results:', err);
      setError(err.message || 'Failed to load interview results');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-green-600 bg-green-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreBadge = (score, maxScore = 10) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateAverage = (results, field) => {
    if (results.length === 0) return 0;
    const sum = results.reduce((acc, item) => acc + (item[field] || 0), 0);
    return (sum / results.length).toFixed(1);
  };

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  const toggleFeedback = (id) => {
    setExpandedFeedback(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Results</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchResults}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Interview Results</h1>
          </div>
          <p className="text-gray-600">View your performance across all interviews</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Code className="w-6 h-6 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">{dsaResults.length}</span>
            </div>
            <p className="text-sm text-gray-600">DSA Interviews</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">{behaviorResults.length}</span>
            </div>
            <p className="text-sm text-gray-600">Behavioral Interviews</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {calculateAverage(dsaResults, 'correctness')}/10
              </span>
            </div>
            <p className="text-sm text-gray-600">Avg DSA Score</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-6 h-6 text-yellow-600" />
              <span className="text-2xl font-bold text-gray-900">
                {calculateAverage(behaviorResults, 'overallScore')}/10
              </span>
            </div>
            <p className="text-sm text-gray-600">Avg Behavioral Score</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <div className="flex gap-4 px-6">
              <button
                onClick={() => setActiveTab('dsa')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'dsa'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  DSA Interviews ({dsaResults.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('behavioral')}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === 'behavioral'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Behavioral Interviews ({behaviorResults.length})
                </div>
              </button>
            </div>
          </div>

          {/* DSA Results Table */}
          {activeTab === 'dsa' && (
            <div className="p-6">
              {dsaResults.length === 0 ? (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No DSA Interviews Yet</h3>
                  <p className="text-gray-600">Complete your first coding interview to see results here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Interview ID</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Correctness</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Time Complexity</th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-900">Space Complexity</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Feedback</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dsaResults.map((result, index) => (
                        <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-900">#{result.interviewId}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.correctness)}`}>
                                {result.correctness}/10
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.timeComplexity)}`}>
                                {result.timeComplexity}/10
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreColor(result.spaceComplexity)}`}>
                                {result.spaceComplexity}/10
                              </span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="max-w-2xl">
                              <p className={`text-sm text-gray-700 ${expandedFeedback.has(result.id) ? '' : 'line-clamp-2'}`}>
                                {result.feedback}
                              </p>
                              {result.feedback && result.feedback.length > 150 && (
                                <button
                                  onClick={() => toggleFeedback(result.id)}
                                  className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                                >
                                  {expandedFeedback.has(result.id) ? 'Show less' : 'Show more'}
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Behavioral Results Table */}
          {activeTab === 'behavioral' && (
            <div className="p-6">
              {behaviorResults.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Behavioral Interviews Yet</h3>
                  <p className="text-gray-600">Complete your first behavioral interview to see results here.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {behaviorResults.map((result, index) => (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Interview #{result.id}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Overall Score:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(result.overallScore)}`}>
                            {result.overallScore}/10
                          </span>
                        </div>
                      </div>

                      {/* Scores Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full ${getScoreBadge(result.communication)} text-white flex items-center justify-center mx-auto mb-2 font-bold`}>
                            {result.communication}
                          </div>
                          <p className="text-xs text-gray-600">Communication</p>
                        </div>
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full ${getScoreBadge(result.situationalAwareness)} text-white flex items-center justify-center mx-auto mb-2 font-bold`}>
                            {result.situationalAwareness}
                          </div>
                          <p className="text-xs text-gray-600">Situational Awareness</p>
                        </div>
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full ${getScoreBadge(result.leadershipSkills)} text-white flex items-center justify-center mx-auto mb-2 font-bold`}>
                            {result.leadershipSkills}
                          </div>
                          <p className="text-xs text-gray-600">Leadership</p>
                        </div>
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full ${getScoreBadge(result.teamworkAbility)} text-white flex items-center justify-center mx-auto mb-2 font-bold`}>
                            {result.teamworkAbility}
                          </div>
                          <p className="text-xs text-gray-600">Teamwork</p>
                        </div>
                        <div className="text-center">
                          <div className={`w-12 h-12 rounded-full ${getScoreBadge(result.conflictResolution)} text-white flex items-center justify-center mx-auto mb-2 font-bold`}>
                            {result.conflictResolution}
                          </div>
                          <p className="text-xs text-gray-600">Conflict Resolution</p>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Overall Feedback:</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{result.overallFeedback}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}