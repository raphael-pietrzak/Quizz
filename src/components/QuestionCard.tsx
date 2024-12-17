import React, { useState } from 'react';
import { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
}) => {
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (option: string) => {
    if (!selectedAnswer) {
      onAnswerSelect(option);
      setShowFeedback(true);
    }
  };

  const getOptionClass = (option: string) => {
    if (!showFeedback || !selectedAnswer) {
      return selectedAnswer === option
        ? 'bg-blue-100 border-blue-500'
        : 'hover:bg-gray-50';
    }

    if (option === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }

    if (selectedAnswer === option && option !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }

    return 'opacity-50';
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-3">
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleAnswerClick(key)}
            disabled={!!selectedAnswer}
            className={`w-full p-4 text-left border rounded-lg transition-colors ${getOptionClass(
              key
            )}`}
          >
            <span className="font-semibold mr-2">{key.toUpperCase()}.</span>
            {value}
          </button>
        ))}
      </div>
      {showFeedback && selectedAnswer && (
        <div className={`mt-4 p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer 
            ? 'bg-green-50 text-green-800' 
            : 'bg-red-50 text-red-800'
        }`}>
          {selectedAnswer === question.correctAnswer 
            ? '✅ Bonne réponse !' 
            : `❌ Incorrect. La bonne réponse était : ${question.correctAnswer.toUpperCase()}`}
        </div>
      )}
    </div>
  );
};