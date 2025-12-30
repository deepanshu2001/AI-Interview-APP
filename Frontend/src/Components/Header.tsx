import React, { useState } from 'react';
import { Menu, X, Code, Brain, Trophy, User, LogOut, Settings } from 'lucide-react';

// Header Component
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
              <span className="text-white text-lg font-bold">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">AlgoAce</span>
              <span className="text-xs text-gray-500 hidden sm:block">Tech Interview Prep</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <Code className="h-5 w-5" />
              <span className="font-medium">DSA Practice</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <Brain className="h-5 w-5" />
              <span className="font-medium">Behavioral</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <Trophy className="h-5 w-5" />
              <span className="font-medium">Leaderboard</span>
            </a>
          </div>

          {/* Desktop Profile Menu */}
          <div className="hidden md:flex items-center space-x-4">
           
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                <Code className="h-5 w-5" />
                <span className="font-medium">DSA Practice</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                <Brain className="h-5 w-5" />
                <span className="font-medium">Behavioral</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Leaderboard</span>
              </a>
              <hr className="border-gray-200" />
              
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
