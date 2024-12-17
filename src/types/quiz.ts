export interface Question {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correctAnswer: string;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  userAnswers: Record<number, string>;
  isFinished: boolean;
}