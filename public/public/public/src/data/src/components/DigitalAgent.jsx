import { useState } from 'react';
import { theoryQuestions } from '../data/questions';

export default function DigitalAgent({ userProgress }) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [showVideo, setShowVideo] = useState(null);

  const handleQuestion = () => {
    const question = theoryQuestions.find(q => q.question.includes(input));
    if (question) {
      setResponse(`שאלה: ${question.question}\nתשובה נכונה: ${question.correctAnswer}\nהסבר: ${question.explanation}`);
      setShowVideo(question.videoUrl);
    } else {
      const weakCategory = Object.keys(userProgress).reduce((a, b) => 
        userProgress[a].correct / (userProgress[a].total || 1) < userProgress[b].correct / (userProgress[b].total || 1) ? a : b
      );
      setResponse(`לא מצאתי שאלה מתאימה. אני ממליץ להתמקד בנושא "${weakCategory}" שבו הצלחת פחות (${((userProgress[weakCategory].correct / (userProgress[weakCategory].total || 1)) * 100).toFixed(1)}%). האם תרצה תרגול נוסף בנושא זה?`);
      setShowVideo(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md rtl">
      <h2 className="text-xl font-bold mb-2">שאל את אלפי, הסוכן הדיגיטלי</h2>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
        placeholder="הקלד שאלה על תיאוריה..."
      />
      <button
        onClick={handleQuestion}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        שאל
      </button>
      {response && <p className="mt-2 whitespace-pre-line">{response}</p>}
      {showVideo && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">סרטון הסבר</h3>
          <iframe
            width="100%"
            height="200"
            src={showVideo}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
