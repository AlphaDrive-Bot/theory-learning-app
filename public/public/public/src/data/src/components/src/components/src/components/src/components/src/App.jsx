import { useState, useEffect } from 'react';
import DigitalAgent from './components/DigitalAgent';
import PracticeTest from './components/PracticeTest';
import ProgressTracker from './components/ProgressTracker';
import Achievements from './components/Achievements';
import { dailyTasks } from './data/questions';

export default function App() {
  const [userProgress, setUserProgress] = useState(() => {
    const saved = localStorage.getItem("userProgress");
    return saved ? JSON.parse(saved) : {
      "מהירות": { correct: 0, total: 0, easy: 0, medium: 0, hard: 0 },
      "תמרורים": { correct: 0, total: 0, easy: 0, medium: 0, hard: 0 },
      "עדיפות": { correct: 0, total: 0, easy: 0, medium: 0, hard: 0 }
    };
  });
  const [points, setPoints] = useState(() => parseInt(localStorage.getItem("points")) || 0);
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : dailyTasks.map(task => ({ ...task, progress: 0 }));
  });

  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress));
    localStorage.setItem("points", points);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [userProgress, points, tasks]);

  const updateProgress = (category, isCorrect, difficulty) => {
    setUserProgress(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        correct: prev[category].correct + (isCorrect ? 1 : 0),
        total: prev[category].total + 1,
        [difficulty.toLowerCase()]: prev[category][difficulty.toLowerCase()] + 1
      }
    }));
  };

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
  };

  const updateTasks = (category, isCorrect, successRate) => {
    setTasks(prev => prev.map(task => {
      if (task.category === category && isCorrect) {
        return { ...task, progress: task.progress + 1 };
      } else if (task.description.includes("80%") && successRate >= task.target) {
        return { ...task, progress: 1 };
      }
      return task;
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 rtl">
      <h1 className="text-3xl font-bold text-center mb-4">לומדים תיאוריה עם אלפי</h1>
      <Achievements points={points} tasks={tasks} />
      <div className="my-4">
        <ProgressTracker progress={userProgress} />
      </div>
      <div className="my-4">
        <PracticeTest updateProgress={updateProgress} addPoints={addPoints} updateTasks={updateTasks} />
      </div>
      <DigitalAgent userProgress={userProgress} />
    </div>
  );
}
