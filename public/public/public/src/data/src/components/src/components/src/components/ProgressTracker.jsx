import { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function ProgressTracker({ progress }) {
  useEffect(() => {
    const ctx = document.getElementById("progressChart")?.getContext("2d");
    if (ctx) {
      const chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: Object.keys(progress),
          datasets: [{
            label: "אחוזי הצלחה",
            data: Object.values(progress).map(p => ((p.correct / (p.total || 1)) * 100).toFixed(1)),
            backgroundColor: "rgba(37, 99, 235, 0.6)"
          }]
        },
        options: {
          scales: {
            y: { beginAtZero: true, max: 100 }
          }
        }
      });
      return () => chart.destroy();
    }
  }, [progress]);

  return (
    <div className="p-4 bg-blue-100 rounded-lg shadow-md rtl">
      <h2 className="text-xl font-bold mb-2">התקדמות הלמידה</h2>
      {Object.keys(progress).map(category => (
        <div key={category} className="mb-2">
          <p>{category}: {progress[category].correct} מתוך {progress[category].total} ({((progress[category].correct / (p.total || 1)) * 100).toFixed(1)}%)</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${(progress[category].correct / (progress[category].total || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
      <div className="chart-container">
        <canvas id="progressChart"></canvas>
      </div>
    </div>
  );
}
