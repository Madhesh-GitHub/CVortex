import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';

const ResumeScore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const resumeFile = parsedData?.files?.resumeParsed;
  const jdFile = parsedData?.files?.jdParsed;

  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState(null);
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    if (!resumeFile || !jdFile) {
      setError("Missing resume or job description. Please upload again.");
      setLoading(false);
      return;
    }

    const fetchScore = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resume/score", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resumeFile, jdFile }),
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setAiResult(data.result);
        console.log("🎯 AI Response:", data.result);

      } catch (error) {
        console.error("Error fetching score:", error);
        setError("Unable to fetch score. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [resumeFile, jdFile]);

 const extractSection = (label) => {
  if (typeof aiResult !== 'string') return [];

  const labelVariants = {
    Suggestions: ['Suggestions', 'Improvement suggestions'],
    Strengths: ['Strengths'],
    Weaknesses: ['Weaknesses'],
  };

  for (const variant of labelVariants[label]) {
    // Handles both plain "Suggestions:" and markdown "**Suggestions:**"
    const regex = new RegExp(`\\*\\*?${variant}:\\*\\*?\\s*\\n([\\s\\S]*?)(?=\\n\\*\\*?\\w+:|\\n\\w+:|$)`, 'i');
    const match = aiResult.match(regex);
    if (match) {
      return match[1]
        .split(/\n\d+\.\s+/) // Bullet points like 1. 2. ...
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }

  return [];
};


const scoreMatch = aiResult?.match?.(/(?:Matching Score|I would give a matching score of)[^\d]*(\d+)/i);

  const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

  // Animate the score display
  useEffect(() => {
    if (score !== null) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 15);
    }
  }, [score]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl font-medium text-gray-600 animate-pulse">⏳ Analyzing your resume...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600 font-semibold">🚫 {error}</p>
      </div>
    );
  }

  const sections = ['Strengths', 'Weaknesses', 'Suggestions'];
  const courses = [
    { title: 'Front-End with React', level: 'Intermediate', color: 'bg-purple-500' },
    { title: 'DSA for Placements', level: 'Beginner', color: 'bg-blue-500' },
    { title: 'AI Resume Booster', level: 'Advanced', color: 'bg-green-600' },
  ];

  return (
    <div className="relative px-4 py-8 max-w-5xl mx-auto mt-10">
      {/* Upload Again button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/app/upload')}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          🔁 Upload Again
        </button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-10">Resume Score Report</h1>

      {/* Round Score */}
      {score !== null && (
        <div className="flex justify-center mb-10">
          <div className="w-40 h-40">
            <CircularProgressbar
              value={displayedScore}
              text={`${displayedScore}%`}
              strokeWidth={12}
              styles={buildStyles({
                textSize: '18px',
                pathColor: score >= 80 ? '#16a34a' : score >= 50 ? '#facc15' : '#ef4444',
                textColor: '#1f2937',
                trailColor: '#e5e7eb',
              })}
            />
          </div>
        </div>
      )}
      

      {/* AI Suggestions */}
      {sections.map((label, idx) => {
        const items = extractSection(label);
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="mb-8 bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">{label}</h2>
            {items.length > 0 ? (
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-400">No {label.toLowerCase()} found.</p>
            )}
          </motion.div>
        );
      })}

      {/* Course Recommendations */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-center text-indigo-700">🎓 Suggested Courses to Improve</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            className={`p-5 text-white rounded-xl shadow-xl ${course.color}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
            <p className="text-sm">Level: {course.level}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ResumeScore;



