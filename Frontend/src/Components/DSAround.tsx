import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle, Clock, Code, FileText, ArrowLeft, Loader2, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DSARoundPage() {
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [code, setCode] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [problem, setProblem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [feedback, setFeedback] = useState(null);
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleSubmit();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const fetchProblem = async (retryCount = 0) => {
    const MAX_RETRIES = 3;
    
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/dsa-problem`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch problem');
      }
      
      // Get the raw text first
      let text = await response.text();
     
      
      // Extract JSON from the response
      let jsonData;
      try {
        // Try parsing directly first
        jsonData = JSON.parse(text);
      } catch (e) {
        console.log("Direct parse failed, trying to extract JSON...");
        // If that fails, try to extract JSON from the text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          let jsonString = jsonMatch[0];
          
          // Fix common JSON issues
          // Remove trailing commas before closing braces/brackets
          jsonString = jsonString.replace(/,(\s*[}\]])/g, '$1');
          
          try {
            jsonData = JSON.parse(jsonString);
          } catch (parseError) {
            // If we still can't parse and haven't exceeded retries, try again
            if (retryCount < MAX_RETRIES) {
              console.log(`Invalid JSON received, retrying... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
              return fetchProblem(retryCount + 1);
            }
            throw new Error('No valid JSON found in response after multiple attempts');
          }
        } else {
          // If we can't find JSON and haven't exceeded retries, try again
          if (retryCount < MAX_RETRIES) {
            console.log(`Invalid JSON received, retrying... (attempt ${retryCount + 1}/${MAX_RETRIES})`);
            return fetchProblem(retryCount + 1);
          }
          throw new Error('No valid JSON found in response after multiple attempts');
        }
      }
      
    
      setProblem(jsonData);
    } catch (err) {
      console.error('Error fetching problem:', err);
      setError('Failed to load problem. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    setHasStarted(true);
    if (!problem) {
      fetchProblem();
    }
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setHasStarted(false);
    setTimeLeft(45 * 60);
    setCode('');
    setIsSubmitted(false);
    setProblem(null);
    setFeedback(null);
    setError(null);
    fetchProblem();
  };

  const handleSubmit = async() => {
    setIsSubmitted(true);
    setIsActive(false);
    setIsLoading(true);
    setError(null);
   
    const dsaEvaluation = {
      "usercode": code,
      "userid": user?.id,
      "problem": problem?.problemStatement
    };
    
    try {
      console.log("Submitting evaluation:", dsaEvaluation);
      
      const response = await fetch(`${API_URL}/api/user/dsa-evaluation`, {
        method: "POST",
        credentials: 'include',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(dsaEvaluation)
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server returned ${response.status}: ${errorText}`);
      }
      
      // Read the response properly
      const result = await response.text();
      console.log("Raw result:", result);
      
      // Try to parse as JSON
      try {
        const jsonResult = JSON.parse(result);
        console.log("Parsed JSON:", jsonResult);
        setFeedback(jsonResult);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        // If not JSON, set as plain text with default structure
        setFeedback({ 
          feedback: result,
          correctness: "N/A",
          timeComplexity: "N/A",
          spaceComplexity: "N/A"
        });
      }
      
    } catch (err) {
      console.error("Error evaluating code:", err);
      setError(err.message || "Failed to evaluate code");
    } finally {
      setIsLoading(false);
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 15 * 60) return 'text-green-600';
    if (timeLeft > 5 * 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY':
        return 'bg-green-100 text-green-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'HARD':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBackToDashboard = () => {
    window.location.href = '/dashboard';
  };

  if (isLoading && hasStarted && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading problem...</p>
        </div>
      </div>
    );
  }

  if (error && hasStarted && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md text-center">
          <div className="text-red-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Problem</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchProblem()}
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
        <button
          onClick={handleBackToDashboard}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Dashboard</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">DSA Coding Round</h1>
              <p className="text-gray-600">Complete the problem within 45 minutes</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`text-4xl md:text-5xl font-mono font-bold ${getTimerColor()}`}>
                {formatTime(timeLeft)}
              </div>
              <Clock className={`w-8 h-8 ${getTimerColor()}`} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {!hasStarted && (
              <button
                onClick={startTimer}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Play className="w-5 h-5" />
                Start Round
              </button>
            )}
            
            {hasStarted && !isSubmitted && (
              <>
                {isActive ? (
                  <button
                    onClick={pauseTimer}
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium"
                  >
                    <Pause className="w-5 h-5" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={startTimer}
                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <Play className="w-5 h-5" />
                    Resume
                  </button>
                )}
                
                <button
                  onClick={resetTimer}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </button>
              </>
            )}
          </div>
        </div>

        {hasStarted && problem && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Problem Statement</h2>
                </div>
                
              </div>
              
              <div className="prose prose-sm max-w-none">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                  {problem.tags && (
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {problem.tags}
                    </span>
                  )}
                </div>
                
                <div className="text-gray-700 whitespace-pre-wrap mb-4">
                  {problem.problemStatement}
                </div>

                {problem.testCases && (
                  <>
                    <h4 className="font-semibold mb-2 text-gray-900">Test Cases:</h4>
                    <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm whitespace-pre-wrap text-gray-800">
                      {problem.testCases}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Code Editor</h2>
                </div>
                
                {!isSubmitted && (
                  <button
                    onClick={handleSubmit}
                    disabled={!code.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Submit
                  </button>
                )}
              </div>

              {isSubmitted ? (
                <div className="flex-1 bg-green-50 rounded-lg border-2 border-green-200 p-6 overflow-auto">
                  <div className="text-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Code Submitted!</h3>
                    <p className="text-green-700">Evaluating your solution...</p>
                  </div>
                  
                  {isLoading && (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mr-3" />
                      <span className="text-gray-600 text-lg">Analyzing your code...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <span className="text-red-600 text-2xl">⚠️</span>
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-red-900">Error</p>
                          <p className="text-red-700 mt-1">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {feedback && !isLoading && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 text-left space-y-4">
                      <h4 className="font-bold text-xl text-gray-900 border-b-2 border-gray-200 pb-3 mb-4">
                        📊 Evaluation Results
                      </h4>
                      
                      {feedback.correctness && (
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-r">
                          <p className="font-bold text-blue-900 mb-1">✓ Correctness</p>
                          <p className="text-blue-800">{feedback.correctness}</p>
                        </div>
                      )}
                      
                      {feedback.timeComplexity && (
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-500 p-4 rounded-r">
                          <p className="font-bold text-purple-900 mb-1">⏱️ Time Complexity</p>
                          <p className="text-purple-800">{feedback.timeComplexity}</p>
                        </div>
                      )}
                      
                      {feedback.spaceComplexity && (
                        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-l-4 border-indigo-500 p-4 rounded-r">
                          <p className="font-bold text-indigo-900 mb-1">💾 Space Complexity</p>
                          <p className="text-indigo-800">{feedback.spaceComplexity}</p>
                        </div>
                      )}
                      
                      {feedback.feedback && (
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-gray-500 p-4 rounded-r">
                          <p className="font-bold text-gray-900 mb-2">💡 Detailed Feedback</p>
                          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                            {feedback.feedback}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <button
                    onClick={resetTimer}
                    className="mt-6 w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold shadow-md hover:shadow-lg"
                  >
                    🔄 Try Another Problem
                  </button>
                </div>
              ) : (
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Write your code here..."
                  className="flex-1 w-full p-4 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={isSubmitted}
                />
              )}
            </div>
          </div>
        )}

        {!hasStarted && (
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
            <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Begin?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Click "Start Round" to begin your 45-minute coding challenge. Once started, the timer will begin counting down 
              and your problem will be revealed. You can pause and resume, but the clock keeps track of your total time.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium">
                💡 Tip: Once you start, read the problem carefully. You'll have 45 minutes to write and submit your solution.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}