import React, { useState } from 'react';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultScreen } from './components/ResultScreen';
import { QuizState } from './types/quiz';
import { Brain } from 'lucide-react';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 1,
    score: 0,
    userAnswers: {},
    isFinished: false,
  });

  const currentQuestion = questions.find(q => q.id === quizState.currentQuestion);

  const handleAnswerSelect = (answer: string) => {
    const isCorrect = answer === currentQuestion?.correctAnswer;
    
    setQuizState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [prev.currentQuestion]: answer },
      score: prev.score + (isCorrect ? 1 : 0),
    }));

    // Add a delay before moving to the next question
    setTimeout(() => {
      if (quizState.currentQuestion === questions.length) {
        setQuizState(prev => ({
          ...prev,
          isFinished: true,
        }));
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestion: prev.currentQuestion + 1,
        }));
      }
    }, 2000); // 2 second delay
  };

  const handleRestart = () => {
    setQuizState({
      currentQuestion: 1,
      score: 0,
      userAnswers: {},
      isFinished: false,
    });
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Brain className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold">Design Patterns Quiz</h1>
        </div>

        {quizState.isFinished ? (
          <ResultScreen
            score={quizState.score}
            totalQuestions={questions.length}
            userAnswers={quizState.userAnswers}
            questions={questions}
            onRestart={handleRestart}
          />
        ) : (
          <>
            <ProgressBar
              current={quizState.currentQuestion}
              total={questions.length}
            />
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={quizState.userAnswers[quizState.currentQuestion]}
              onAnswerSelect={handleAnswerSelect}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;