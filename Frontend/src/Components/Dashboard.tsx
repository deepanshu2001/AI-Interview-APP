import React, { useState } from 'react';
import { Code, Brain, Trophy, TrendingUp, Calendar, Clock, CheckCircle, Target, Award, Flame, Star, BarChart } from 'lucide-react';

export default function Dashboard() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    totalInterviews: 42,
    lastDSAScore: 85,
    lastBehavioralScore: 92,
    totalDSARounds: 28,
    totalBehavioralRounds: 14
  });

  const stats = [
    {
      title: 'Total Interviews',
      value: user.totalInterviews,
      icon: Trophy,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Last DSA Score',
      value: `${user.lastDSAScore}%`,
      icon: Code,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Last Behavioral Score',
      value: `${user.lastBehavioralScore}%`,
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Total DSA Rounds',
      value: user.totalDSARounds,
      icon: BarChart,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      title: 'Total Behavioral Rounds',
      value: user.totalBehavioralRounds,
      icon: Star,
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-50'
    }
  ];

  const recentActivity = [
    { title: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2 hours ago', category: 'DSA', score: 85 },
    { title: 'Tell me about yourself', difficulty: 'Medium', status: 'Completed', time: '5 hours ago', category: 'Behavioral', score: 92 },
    { title: 'Binary Tree Inorder', difficulty: 'Medium', status: 'Attempted', time: '1 day ago', category: 'DSA', score: 70 },
    { title: 'Describe a challenge', difficulty: 'Hard', status: 'Completed', time: '2 days ago', category: 'Behavioral', score: 88 }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'solved':
      case 'completed': return 'text-green-600';
      case 'attempted': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">Let's continue your interview preparation journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start DSA Interview</h3>
                  <p className="text-sm text-gray-600 text-center">Practice coding problems</p>
                </button>

                <button className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Behavioral Interview</h3>
                  <p className="text-sm text-gray-600 text-center">Mock behavioral questions</p>
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
                <BarChart className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-center justify-between mb-2">
                    <Code className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">{user.lastDSAScore}%</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">DSA Performance</p>
                  <p className="text-xs text-gray-500 mt-1">{user.totalDSARounds} rounds completed</p>
                </div>
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-600">{user.lastBehavioralScore}%</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">Behavioral Performance</p>
                  <p className="text-xs text-gray-500 mt-1">{user.totalBehavioralRounds} rounds completed</p>
                </div>
              </div>
            </div>
          </div>

      
         
        </div>

       
      </div>
    </div>
  );
}