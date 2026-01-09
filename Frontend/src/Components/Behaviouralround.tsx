import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Play, Loader2, RotateCcw, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Behaviouralround() {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [question, setQuestion] = useState('');
    const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
    const [error, setError] = useState('');
    const [answer, setAnswer] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [evaluationResult, setEvaluationResult] = useState(null);
    const timerRef = useRef(null);
    const [recordedUrl, setRecordedUrl] = useState('');
    const [recordedBlob, setRecordedBlob] = useState(null);
    const mediaStream = useRef(null);
    const mediaRecorder = useRef(null);
    const {user}=useAuth();
    const chunks = useRef([]);
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(
                { audio: true }
            );
            mediaStream.current = stream;
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.current.push(e.data);
                }
            };
            mediaRecorder.current.start();
            console.log('Recording started');
        } catch (error) {
            console.error('Error accessing microphone:', error);
            setError('Failed to access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        return new Promise((resolve) => {
            if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
                mediaRecorder.current.onstop = () => {
                    const recordedBlob = new Blob(
                        chunks.current, { type: 'audio/webm' }
                    );
                    const url = URL.createObjectURL(recordedBlob);
                    setRecordedUrl(url);
                    setRecordedBlob(recordedBlob);
                    console.log('Recording stopped, blob created:', recordedBlob);
                    chunks.current = [];
                    resolve(recordedBlob);
                };
                mediaRecorder.current.stop();
            } else {
                resolve(null);
            }
            
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        });
    };

    const resetTimer = () => {
        setTimeLeft(5 * 60);
        setIsRunning(false);
        setHasStarted(false);
        setQuestion('');
        setIsLoadingQuestion(false);
        setError('');
        setAnswer('');
        setRecordedUrl('');
        setRecordedBlob(null);
        setShowResults(false);
        setEvaluationResult(null);
        
        if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
            mediaRecorder.current.stop();
        }
        if (mediaStream.current) {
            mediaStream.current.getTracks().forEach((track) => {
                track.stop();
            });
        }
        chunks.current = [];
    };

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning, timeLeft]);

    const fetchQuestion = async () => {
        setIsLoadingQuestion(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/behavioralquestion`);
            if (!response.ok) {
                throw new Error('Failed to fetch question');
            }
            const data = await response.text();
            setQuestion(data);
        } catch (err) {
            setError('Failed to load question. Please try again.');
            console.error('Error fetching question:', err);
        } finally {
            setIsLoadingQuestion(false);
        }
    };

    const startTimer = async () => {
        if (!hasStarted) {
            await fetchQuestion();
        }
        startRecording();
        setIsRunning(true);
        setHasStarted(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');
        
        try {
            const blob = await stopRecording();
            
            if (!blob) {
                setError('No audio recorded. Please record your answer first.');
                setIsSubmitting(false);
                return;
            }
            
            const formData = new FormData();
            formData.append('audio', blob, 'recording.webm');
            formData.append('question', question);
            formData.append('userId',user?.id);
            console.log('Submitting form data:');
            console.log('Question:', question);
            console.log('Audio blob size:', blob.size);
            
            const response = await fetch(`${API_URL}/api/user/behaviour`, {
                method: "POST",
                credentials: 'include',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.text();
                console.log("Evaluation result:", result);
                
                try {
                    const evaluationData = JSON.parse(result);
                    console.log("Parsed evaluation:", evaluationData);
                    setEvaluationResult(evaluationData);
                    setShowResults(true);
                } catch (parseError) {
                    console.log("Response is plain text:", result);
                    setEvaluationResult({ overallFeedback: result });
                    setShowResults(true);
                }
                
            } else {
                const errorText = await response.text();
                console.error("Submission failed:", response.status, errorText);
                setError(`Submission failed: ${response.status}. Please try again.`);
            }
        } catch (error) {
            console.error("Error submitting:", error);
            setError('Failed to submit answer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimerColor = () => {
        if (timeLeft >= 2 * 60) {
            return 'text-green-600';
        } else if (timeLeft >= 1 * 60) {
            return 'text-yellow-600';
        }
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <button 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer" 
                    onClick={() => navigate("/dashboard")}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Dashboard</span>
                </button>

                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-4 md:mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Behavioral Round</h1>
                            <p className="text-gray-600">Complete the problem within 5 minutes</p>
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <div className={`text-4xl md:text-5xl font-mono font-bold ${getTimerColor()}`}>
                                {formatTime(timeLeft)}
                            </div>
                            <Clock className={`w-8 h-8 ${getTimerColor()}`} />
                        </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                        {!hasStarted && (
                            <button
                                onClick={startTimer}
                                disabled={isLoadingQuestion}
                                className="flex items-center gap-2 cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isLoadingQuestion ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5" />
                                        Start Round
                                    </>
                                )}
                            </button>
                        )}
                        
                        {hasStarted && (
                            <button
                                onClick={resetTimer}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Reset
                            </button>
                        )}
                    </div>
                </div>

                {!hasStarted ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
                        <Clock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to Begin?</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Click "Start Round" to begin your 5-minute Behavioral round. Once started, the timer will begin counting down
                            and your problem will be revealed. Recording will start automatically.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                            <p className="text-blue-800 font-medium">
                                💡 Tip: Once you start, read the question carefully. You'll have 5 minutes to record and submit your answer.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                <p className="text-red-800">{error}</p>
                                {!question && (
                                    <button 
                                        onClick={fetchQuestion}
                                        className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    >
                                        Retry
                                    </button>
                                )}
                            </div>
                        )}
                        
                        {isLoadingQuestion ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                                <p className="text-gray-600">Loading your behavioral question...</p>
                            </div>
                        ) : question ? (
                            <>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Behavioral Question</h2>
                                <div className="prose max-w-none">
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                                        <p className="text-gray-800 text-lg">{question}</p>
                                    </div>
                                    
                                    {mediaRecorder.current && mediaRecorder.current.state === 'recording' && (
                                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-center gap-3">
                                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                                            <p className="text-red-800 font-medium">Recording in progress...</p>
                                        </div>
                                    )}
                                    
                                    {recordedUrl && (
                                        <div className="mb-4">
                                            <p className="text-sm text-gray-600 mb-2">Your recorded answer:</p>
                                            <audio controls src={recordedUrl} className="w-full" />
                                        </div>
                                    )}
                                    
                                    <div className="mt-4 flex gap-3">
                                        <button 
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || !hasStarted}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Answer'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </div>
                )}

                {timeLeft === 0 && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-md text-center">
                            <Clock className="w-16 h-16 text-red-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Time's Up!</h2>
                            <p className="text-gray-600 mb-6">
                                Your 5 minutes have ended. Please submit your answer.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button 
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-gray-400"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                                </button>
                                <button 
                                    onClick={() => navigate("/dashboard")}
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Modal */}
                {showResults && evaluationResult && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center gap-3 mb-6">
                                <CheckCircle className="w-12 h-12 text-green-600" />
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Evaluation Complete!</h2>
                                    <p className="text-gray-600">Here's your behavioral assessment</p>
                                </div>
                            </div>

                            {evaluationResult.overallScore ? (
                                <>
                                    <div className="text-center mb-8">
                                        <div className="text-6xl font-bold text-blue-600 mb-2">
                                            {evaluationResult.overallScore.toFixed(1)}/10
                                        </div>
                                        <p className="text-gray-600 text-lg">Overall Score</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                                {evaluationResult.communication}/10
                                            </div>
                                            <p className="text-sm text-gray-600">Communication</p>
                                        </div>
                                        <div className="bg-green-50 p-6 rounded-lg">
                                            <div className="text-3xl font-bold text-green-600 mb-2">
                                                {evaluationResult.situationalAwareness}/10
                                            </div>
                                            <p className="text-sm text-gray-600">Situational Awareness</p>
                                        </div>
                                        <div className="bg-purple-50 p-6 rounded-lg">
                                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                                {evaluationResult.leadershipSkills}/10
                                            </div>
                                            <p className="text-sm text-gray-600">Leadership Skills</p>
                                        </div>
                                        <div className="bg-yellow-50 p-6 rounded-lg">
                                            <div className="text-3xl font-bold text-yellow-600 mb-2">
                                                {evaluationResult.teamworkAbility}/10
                                            </div>
                                            <p className="text-sm text-gray-600">Teamwork Ability</p>
                                        </div>
                                        <div className="bg-red-50 p-6 rounded-lg md:col-span-2">
                                            <div className="text-3xl font-bold text-red-600 mb-2">
                                                {evaluationResult.conflictResolution}/10
                                            </div>
                                            <p className="text-sm text-gray-600">Conflict Resolution</p>
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            {evaluationResult.overallFeedback && (
                                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Detailed Feedback</h3>
                                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                        {evaluationResult.overallFeedback}
                                    </p>
                                </div>
                            )}

                            <div className="flex gap-3 justify-end">
                                
                                <button 
                                    onClick={() => navigate("/dashboard")}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}