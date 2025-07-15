export default function Achievements({ points, tasks }) {
  const achievements = [
    { name: "תלמיד מתחיל", points: 50 },
    { name: "מומחה תמרורים", points: 100 },
    { name: "אלוף תיאוריה", points: 200 }
  ];

  return (
    <div className="p-4 bg-yellow-100 rounded-lg shadow-md rtl">
      <h2 className="text-xl font-bold mb-2">הישגים ומשימות</h2>
      <p>נקודות: {points}</p>
      <h3 className="text-lg font-bold mt-2">הישגים</h3>
      {achievements.map(achievement => (
        <p key={achievement.name} className={points >= achievement.points ? "text-green-500" : "text-gray-500"}>
          {achievement.name} ({achievement.points} נקודות)
        </p>
      ))}
      <h3 className="text-lg font-bold mt-2">משימות יומיות</h3>
      {tasks.map(task => (
        <p key={task.id}>
          {task.description}: {task.progress}/{task.target} ({task.reward} נקודות)
        </p>
      ))}
    </div>
  );
}
