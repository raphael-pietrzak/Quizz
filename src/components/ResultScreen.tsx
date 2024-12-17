import React from 'react';
import { Question } from '../types/quiz';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  userAnswers: Record<number, string>;
  questions: Question[];
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Quiz Terminé!</h2>
      <div className="text-6xl font-bold mb-4 text-blue-600">
        {Math.round(percentage)}%
      </div>
      <p className="text-xl mb-6">
        Vous avez obtenu {score} bonnes réponses sur {totalQuestions} questions
      </p>
      <button
        onClick={onRestart}
        className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Recommencer le Quiz
      </button>
    </div>
  );
};