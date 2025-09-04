

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import {
  FaCheckCircle, FaLightbulb, FaFileAlt, FaEdit, FaChartBar,
  FaClipboardList, FaRedo, FaUserTag,FaUserAlt,FaInfoCircle
} from 'react-icons/fa';

const ResumeScore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
const [parsedData] = useState(() => {
  if (location.state?.parsedData) {
    localStorage.setItem("resume_parsed_data", JSON.stringify(location.state.parsedData));
    return location.state.parsedData;
  }
  const saved = localStorage.getItem("resume_parsed_data");
  return saved ? JSON.parse(saved) : null;
});

const resumeFile = parsedData?.files?.resumeParsed;
const jdFile = parsedData?.files?.jdParsed;

  const [displayedJDScore, setDisplayedJDScore] = useState(0);


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

  if (jdFile && aiResult?.skills_match_score) {
    let j = 0;
    const interval2 = setInterval(() => {
      setDisplayedJDScore((prev) => {
        if (prev >= aiResult.skills_match_score) {
          clearInterval(interval2);
          return aiResult.skills_match_score;
        }
        return prev + 1;
      });
    }, 15);
  }
}, [aiResult?.score, aiResult?.skills_match_score, jdFile]);

const handleReset = () => {
  localStorage.removeItem("resume_score_result");
  localStorage.removeItem("resume_parsed_data");
  navigate('/app/upload');
};


  if (loading) return <div className="flex justify-center items-center min-h-screen">⏳ Analyzing Resume...</div>;
  if (error) return <div className="text-center text-red-600 mt-10 font-semibold">{error}</div>;

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

  const ProjectAnalysis = () => {
    if (!aiResult.project_analysis?.length) return null;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-indigo-400">
        <h2 className="flex items-center gap-2 text-xl font-bold text-indigo-700 mb-3">
          <FaChartBar /> Project Analysis
        </h2>
        <ul className="space-y-4">
          {aiResult.project_analysis.map((proj, idx) => (
            <li key={idx} className="bg-gray-50 p-4 rounded shadow-sm">
              <h4 className="font-semibold text-lg text-gray-700">{proj.title}</h4>
              <p className="text-sm text-gray-600">Score: {proj.score}</p>
              <p className="text-gray-800 mt-1">{proj.feedback}</p>
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

  return (
    <>
<div className="max-w-6xl mx-auto px-4 py-10 mt-6">
  {/* Header */}
  <div className="flex justify-between items-center mb-10">
    <h1 className="text-3xl font-bold text-gray-800">Resume Score Report</h1>
    <button
      onClick={handleReset}
      className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
    >
      <FaRedo /> Upload Again
    </button>
  </div>

  {/* Main Content */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    {/* Left: Progress Bar */}
    <div className="flex flex-col items-center justify-center">
      <div className="w-60 h-60">
        <CircularProgressbar
          value={displayedScore}
          text={`${displayedScore}%`}
          strokeWidth={12}
          styles={buildStyles({
            textSize: "18px",
            pathColor:
              displayedScore >= 80
                ? "#22c55e"
                : displayedScore >= 50
                ? "#facc15"
                : "#ef4444",
            textColor: "#334155",
            trailColor: "#e2e8f0",
          })}
        />
      </div>
      <p
        className={`mt-4 text-lg font-semibold ${
          displayedScore >= 80
            ? "text-green-600"
            : displayedScore >= 50
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {displayedScore >= 90
          ? "🔥 Excellent Resume!"
          : displayedScore >= 80
          ? "✅ Awesome!"
          : displayedScore >= 60
          ? "🟡 Good"
          : displayedScore >= 40
          ? "🟠 Average"
          : "🔴 Needs Major Improvement"}
      </p>
      <span
        className={`mt-2 text-sm font-bold px-4 py-1 rounded-full ${
          aiResult.ats_score_label === "Awesome"
            ? "bg-green-100 text-green-700"
            : aiResult.ats_score_label === "Good"
            ? "bg-yellow-100 text-yellow-700"
            : aiResult.ats_score_label === "Average"
            ? "bg-orange-100 text-orange-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        ATS: {aiResult.ats_score_label}
      </span>
    </div>

    {/* Right: Info Card */}
    <div className="bg-blue-50 shadow-xl p-8 rounded-xl text-gray-800">
      <div className="space-y-6">
        {/* Candidate Name */}
        <div className="flex items-center gap-3">
          <FaUserAlt className="text-sky-600 text-xl" />
          <h2 className="text-xl font-bold text-gray-900">
            {aiResult.candidate_name || "Candidate Name"}
          </h2>
        </div>

        {/* Guessed Role */}
        <div className="flex items-center gap-2">
           <h3 className="text-md text-gray-500 font-semibold">Targeted Role:</h3>
          <span className="text-indigo-700 text-base font-medium">
            {aiResult.guessed_role || "Not identified"}
          </span>
        </div>

        {/* Short Summary */}
        <div className="text-gray-600 italic leading-relaxed">
             <h3 className="text-md text-gray-500 font-semibold mb-1">Summary</h3>
          “{aiResult.short_summary || "No summary available"}”
        </div>

        {/* Suitable Roles */}
        {aiResult.suitable_roles?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-4 rounded-lg"
          >
            <h3 className="flex items-center gap-2 text-xl font-bold text-blue-700 mb-3">
              <FaUserTag /> Roles Can Apply
            </h3>
            <div className="flex flex-wrap gap-2">
              {aiResult.suitable_roles.map((role, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold shadow"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  </div>




        <div className="grid md:grid-cols-2 gap-6 pt-16">
          <SectionCard title="Strengths" icon={<FaCheckCircle className="text-green-600" />} items={aiResult.strengths} color="border-green-200" />
          <SectionCard title="Areas to Improve" icon={<FaLightbulb className="text-yellow-500" />} items={aiResult.areas_to_improve} color="border-yellow-200" />
          <SectionCard title="Formatting Feedback" icon={<FaFileAlt className="text-blue-500" />} items={aiResult.formatting_feedback} color="border-blue-200" />
          <QualityBreakdown />
          <SectionCard title="Personality Traits" icon={<FaUserTag className="text-blue-500" />} items={aiResult.personality_traits} color="border-blue-200" />
          <SectionCard title="Weak Phrases" icon={<FaFileAlt className="text-red-500" />} items={aiResult.weak_phrases} color="border-red-200" />
          <SectionCard title="Suggested Keywords" icon={<FaLightbulb className="text-yellow-500" />} items={aiResult.suggested_keywords} color="border-yellow-200" />
          <SectionCard title="Summary CTA Suggestions" icon={<FaEdit className="text-purple-600" />} items={aiResult.summary_cta_suggestions} color="border-purple-200" />
          <SectionCard title="Common Mistakes" icon={<FaFileAlt className="text-orange-600" />} items={aiResult.common_mistakes} color="border-orange-200" />
          <SectionCard title="Industry Tags" icon={<FaClipboardList className="text-blue-600" />} items={aiResult.industry_tags} color="border-blue-200" />
          <SectionCard title="Missing Links" icon={<FaFileAlt className="text-pink-600" />} items={aiResult.missing_links} color="border-pink-200" />
          <SectionCard title="Redundant Content" icon={<FaFileAlt className="text-gray-500" />} items={aiResult.redundant_content} color="border-gray-300" />
          <RewriteCard />
          <ProjectAnalysis />


{aiResult?.section_feedback && (
  <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6"> Section-wise Feedback</h2>

    {/* Two-column grid for first four */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Summary */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
          <FaInfoCircle /> Summary
        </h3>
        <p className="text-gray-700 mt-1">{aiResult.section_feedback.summary}</p>
      </div>

      {/* Experience */}
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
          <FaUserTag /> Experience
        </h3>
        <p className="text-gray-700 mt-1">{aiResult.section_feedback.experience}</p>
      </div>

      {/* Skills */}
      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
          <FaLightbulb /> Skills
        </h3>
        <p className="text-gray-700 mt-1">{aiResult.section_feedback.skills}</p>
      </div>

      {/* Projects */}
      <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-purple-700 flex items-center gap-2">
          <FaEdit /> Projects
        </h3>
        <p className="text-gray-700 mt-1">{aiResult.section_feedback.projects}</p>
      </div>
    </div>

    {/* Full-width final row */}
    <div className="mt-6">
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
          <FaFileAlt /> Education
        </h3>
        <p className="text-gray-700 mt-1">{aiResult.section_feedback.education}</p>
      </div>
    </div>
  </div>
)}

          {/* ATS Compatibility */}
<div className="bg-white shadow-md rounded-xl p-6">
  <h2 className="text-xl font-bold text-gray-800 mb-4"> ATS Compatibility</h2>

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  {/* ATS Compatibility Circle */}
<div className="mt-6 flex flex-col items-center gap-2">
  <div className="w-28 h-28 rounded-full border-4 border-blue-500 flex items-center justify-center shadow-md">
    <div className="text-center">
      <p className="text-2xl font-bold text-blue-700">
        {aiResult.ats_compatibility?.score ?? 0}/10
      </p>
      <p className="text-sm font-medium text-gray-600">ATS Score</p>
    </div>
  </div>

  {/* Optional Label */}
  <span
    className={`mt-2 text-sm font-bold px-4 py-1 rounded-full ${
      aiResult.ats_score_label === "Awesome"
        ? "bg-green-100 text-green-700"
        : aiResult.ats_score_label === "Good"
        ? "bg-yellow-100 text-yellow-700"
        : aiResult.ats_score_label === "Average"
        ? "bg-orange-100 text-orange-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {aiResult.ats_score_label || "N/A"}
  </span>
</div>


    {/* ATS Issues */}
    {aiResult.ats_compatibility?.issues?.length > 0 && (
      <div className="mt-4 md:mt-0">
        <h4 className="text-gray-700 font-semibold mb-1">⚠️ ATS Issues</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {aiResult.ats_compatibility.issues.map((issue, idx) => (
            <li key={idx}>{issue}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  

  {/* AI Feedback Summary */}
  {aiResult.ai_feedback_summary && (
    <div className="mt-6 border-t pt-4">
      <h4 className="text-gray-700 font-semibold mb-2">💡 AI Summary</h4>
      <p className="text-gray-600 text-sm leading-relaxed italic">
        “{aiResult.ai_feedback_summary}”
      </p>
    </div>
  )}
  

  
</div>
<div className="max-w-6xl mx-auto px-4 py-10 space-y-10 mt-6">
  <div className="flex flex-col items-center gap-4">
    <h1 className="text-2xl font-bold text-gray-800">Resume Score</h1>
    <div className="w-40 h-40">
      <CircularProgressbar
        value={jdFile ? displayedJDScore : displayedScore}
        text={`${jdFile ? displayedJDScore : displayedScore}%`}
        styles={buildStyles({
          textSize: '18px',
          pathColor:
            (jdFile ? displayedJDScore : displayedScore) > 70 ? '#10B981' : '#F59E0B',
          textColor: '#1F2937',
          trailColor: '#E5E7EB',
        })}
      />
    </div>
    <p className="text-gray-500 text-sm">
      {jdFile ? 'Based on Resume vs JD Skill Match' : 'Based on Resume Quality'}
    </p>
  </div>
</div>


  {/* Show only if JD is provided */}
{jdFile && (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Matched Skills */}
    <div className="bg-green-50 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-green-700 mb-3 flex items-center gap-2">
        <FaCheckCircle className="text-green-500" /> Matched Skills
      </h2>
      <ul className="list-disc list-inside space-y-1 text-green-800">
        {aiResult?.skills_match?.matched?.length > 0 ? (
          aiResult.skills_match.matched.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))
        ) : (
          <li>No matched skills found.</li>
        )}
      </ul>
    </div>

    {/* Missing Skills */}
    <div className="bg-red-50 p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-red-700 mb-3 flex items-center gap-2">
        <FaClipboardList className="text-red-500" /> Missing Skills
      </h2>
      <ul className="list-disc list-inside space-y-1 text-red-800">
        {aiResult?.skills_match?.missing?.length > 0 ? (
          aiResult.skills_match.missing.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))
        ) : (
          <li>No missing skills. Great match!</li>
        )}
      </ul>
    </div>
  </div>
)}


        </div>
      </div>
      



      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">🎯 Ready to Optimize Your Resume?</h3>
        <p className="text-blue-100 mb-6">
          Use the AI-powered insights above to generate a powerful, ATS-friendly resume in one click.
        </p>
        <button
          onClick={() => navigate('/app/generate-ats-resume')}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <FaEdit className="text-blue-600" />
          Generate ATS-Friendly Resume
        </button>
      </div>
    </>
  );
};

export default ResumeScore;




