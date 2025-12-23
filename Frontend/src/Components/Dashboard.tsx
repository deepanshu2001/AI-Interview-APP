import React, { useState } from 'react';
import { Code, Brain, Trophy, TrendingUp, Calendar, Clock, CheckCircle, Target, Award, Flame } from 'lucide-react';

export default function Dashboard() {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    streak: 7,
    totalProblems: 145,
    problemsSolved: 89,
    rank: 1247
  });

  const stats = [
    {
      title: 'Problems Solved',
      value: '89',
      total: '145',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      percentage: Math.round((89 / 145) * 100)
    },
    {
      title: 'Current Streak',
      value: '7',
      subtitle: 'days',
      icon: Flame,
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      title: 'Global Rank',
      value: '#1,247',
      icon: Trophy,
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-50'
    },
    {
      title: 'Practice Time',
      value: '24h',
      subtitle: 'this week',
      icon: Clock,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50'
    }
  ];

  const recentActivity = [
    { title: 'Two Sum', difficulty: 'Easy', status: 'Solved', time: '2 hours ago', category: 'Arrays' },
    { title: 'Tell me about yourself', difficulty: 'Medium', status: 'Completed', time: '5 hours ago', category: 'Behavioral' },
    { title: 'Binary Tree Inorder', difficulty: 'Medium', status: 'Attempted', time: '1 day ago', category: 'Trees' },
    { title: 'Merge K Sorted Lists', difficulty: 'Hard', status: 'Attempted', time: '2 days ago', category: 'Linked Lists' }
  ];

  const upcomingGoals = [
    { title: 'Complete 10 Array Problems', progress: 70, current: 7, total: 10 },
    { title: 'Practice 5 Behavioral Questions', progress: 40, current: 2, total: 5 },
    { title: 'Solve 3 Hard Problems', progress: 33, current: 1, total: 3 }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                {stat.total && <span className="text-lg text-gray-500">/ {stat.total}</span>}
                {stat.subtitle && <span className="text-sm text-gray-500">{stat.subtitle}</span>}
              </div>
              {stat.percentage && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.percentage}% Complete</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions & Goals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group">
                  <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start DSA</h3>
                  <p className="text-sm text-gray-600 text-center">Practice coding problems</p>
                </button>

                <button className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100 hover:border-purple-300 hover:shadow-md transition-all group">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Brain className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Behavioral</h3>
                  <p className="text-sm text-gray-600 text-center">Mock interviews</p>
                </button>

                <button className="flex flex-col items-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-100 hover:border-amber-300 hover:shadow-md transition-all group">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Leaderboard</h3>
                  <p className="text-sm text-gray-600 text-center">View rankings</p>
                </button>
              </div>
            </div>

            {/* Weekly Goals */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Weekly Goals</h2>
                <Target className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="space-y-4">
                {upcomingGoals.map((goal, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <span className="text-sm font-medium text-gray-600">{goal.current}/{goal.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{goal.progress}% Complete</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <TrendingUp className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{activity.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(activity.difficulty)}`}>
                        {activity.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{activity.category}</span>
                      <span className={`text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm hover:bg-indigo-50 rounded-lg transition-colors">
                View All Activity →
              </button>
            </div>
          </div>
        </div>

        {/* Practice Reminder */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                <Award className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Keep Your Streak Going! 🔥</h3>
                <p className="text-indigo-100">You're on a {user.streak}-day streak. Practice today to maintain it!</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors shadow-md">
              Practice Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}