import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import {
  FaCheckCircle, FaLightbulb, FaFileAlt, FaEdit,
  FaChartBar, FaClipboardList, FaRedo
} from 'react-icons/fa';

const ResumeScore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { parsedData } = location.state || {};
  const resumeFile = parsedData?.files?.resumeParsed;
  const jdFile = parsedData?.files?.jdParsed;

  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState(() => {
    const saved = localStorage.getItem("resume_score_result");
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState(null);
  const [displayedScore, setDisplayedScore] = useState(0);

  useEffect(() => {
    if (aiResult) {
      setLoading(false);
      return;
    }

    if (!resumeFile) {
      setError("Missing resume file. Please upload again.");
      setLoading(false);
      return;
    }

    const fetchScore = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/resume/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeFile, jdFile }),
        });

        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
        const data = await res.json();
        setAiResult(data);
        localStorage.setItem("resume_score_result", JSON.stringify(data));
      } catch (error) {
        setError("Unable to fetch score. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchScore();
  }, [resumeFile, jdFile]);

  // Animate score
  useEffect(() => {
    if (aiResult?.score) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedScore((prev) => {
          if (prev >= aiResult.score) {
            clearInterval(interval);
            return aiResult.score;
          }
          return prev + 1;
        });
      }, 15);
    }
  }, [aiResult?.score]);

  const handleReset = () => {
    localStorage.removeItem("resume_score_result");
    navigate('/app/upload');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">⏳ Analyzing Resume...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 mt-10 font-semibold">{error}</div>;
  }

  const SectionCard = ({ title, icon, items, color }) => {
    if (!items?.length) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-white border-l-4 ${color} p-5 rounded-xl shadow-md`}>
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-3">
          {icon} {title}
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </motion.div>
    );
  };

  const RewriteCard = () => {
    if (!aiResult.example_rewrites?.length) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-300">
        <h2 className="flex items-center gap-2 text-xl font-bold text-indigo-700 mb-3">
          <FaEdit /> Example Rewrites
        </h2>
        {aiResult.example_rewrites.map((ex, i) => (
          <div key={i} className="mb-3">
            <p className="text-sm text-gray-500 mb-1">🔴 Original:</p>
            <p className="text-gray-700 mb-2">{ex.original}</p>
            <p className="text-sm text-gray-500 mb-1">🟢 Suggested:</p>
            <p className="text-green-700 font-semibold">{ex.suggested}</p>
          </div>
        ))}
      </motion.div>
    );
  };

  const QualityBreakdown = () => {
    if (!aiResult.quality_breakdown) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-400">
        <h2 className="flex items-center gap-2 text-xl font-bold text-purple-800 mb-3">
          <FaChartBar /> Quality Breakdown
        </h2>
        <div className="grid grid-cols-2 gap-3 text-gray-700">
          {Object.entries(aiResult.quality_breakdown).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="capitalize">{key}</span>
              <span>{value}/10</span>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  const SkillsMatch = () => {
    if (!aiResult.skills_match?.matched?.length && !aiResult.skills_match?.missing?.length) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-yellow-400">
        <h2 className="flex items-center gap-2 text-xl font-bold text-yellow-800 mb-3">
          <FaClipboardList /> Skills Match
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold text-green-700">✅ Matched</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {aiResult.skills_match.matched.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-red-600">❌ Missing</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {aiResult.skills_match.missing.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Resume Score Report</h1>
        <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
          <FaRedo /> Upload Again
        </button>
      </div>

      <div className='text-center flex flex-col items-center'>
        <p className="text-lg text-gray-600 mb-1 flex items-center gap-2">
          <FaChartBar className="text-indigo-600" />
          <span className="font-semibold">Guessed Role:</span> {aiResult.guessed_role || "Not identified"}
        </p>
        <p className="text-gray-500 italic">
          “{aiResult.short_summary || "No summary available"}”
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-44 h-44">
          <CircularProgressbar
            value={displayedScore}
            text={`${displayedScore}%`}
            strokeWidth={12}
            styles={buildStyles({
              textSize: '18px',
              pathColor: displayedScore >= 80 ? '#22c55e' : displayedScore >= 50 ? '#facc15' : '#ef4444',
              textColor: '#334155',
              trailColor: '#e2e8f0',
            })}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard
          title="Highlights"
          icon={<FaCheckCircle className="text-green-600" />}
          items={aiResult.highlights}
          color="border-green-200"
        />
        <SectionCard
          title="Improvement Tips"
          icon={<FaLightbulb className="text-yellow-500" />}
          items={aiResult.improvement_tips}
          color="border-yellow-200"
        />
        <SectionCard
          title="Formatting Feedback"
          icon={<FaFileAlt className="text-blue-500" />}
          items={aiResult.formatting_feedback}
          color="border-blue-200"
        />
        <QualityBreakdown />
        <SkillsMatch />
        <RewriteCard />
      </div>
    </div>
  );
};

export default ResumeScore;




