import { useState } from 'react';
import { theoryQuestions } from '../data/questions';

export default function PracticeTest({ updateProgress, addPoints, updateTasks }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    const isCorrect = option === theoryQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      addPoints(10);
      updateTasks(theoryQuestions[currentQuestion].category, isCorrect, score / (currentQuestion + 1));
    }
    updateProgress(theoryQuestions[currentQuestion].category, isCorrect, theoryQuestions[currentQuestion].difficulty);
    setTimeout(() => {
      if (currentQuestion + 1 < theoryQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md rtl">
      {showResult ? (
        <div>
          <h2 className="text-xl font-bold">תוצאות המבחן</h2>
          <p>ציון: {score} מתוך {theoryQuestions.length}</p>
          <button
            onClick={() => {
              setCurrentQuestion(0);
              setScore(0);
              setShowResult(false);
              setSelectedAnswer(null);
            }}
            className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            התחל מחדש
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">{theoryQuestions[currentQuestion].question}</h2>
          {theoryQuestions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`block w-full p-2 mb-2 rounded ${
                selectedAnswer === option
                  ? option === theoryQuestions[currentQuestion].correctAnswer
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
          <button
            onClick={() => window.open(theoryQuestions[currentQuestion].videoUrl, "_blank")}
            className="mt-2 text-blue-500 underline"
          >
            צפה בסרטון הסבר
          </button>
        </div>
      )}
    </div>
  );
}
