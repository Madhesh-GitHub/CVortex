import fs from 'fs/promises';
import path from 'path';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();


console.log('🔑 GROQ API Key loaded:', process.env.GROQ_API_KEY ? 'Yes' : 'No');
console.log('🔑 Key preview:', process.env.GROQ_API_KEY ? process.env.GROQ_API_KEY.substring(0, 10) + '...' : 'Not found');


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const scoreResume = async (req, res) => {
  try {
    const { resumeFile, jdFile } = req.body;

    if (!resumeFile) {
      return res.status(400).json({ message: "Missing resumeFile" });
    }

    const resumePath = path.join("parsed_content", resumeFile);
    console.log("📁 Looking for resume at:", resumePath);

   
    const resume = await fs.readFile(resumePath, "utf-8");
       
       let jd = null;

       if (typeof jdFile === 'string' && jdFile.trim() !== "") {
        const jdPath = path.join("parsed_content", jdFile);
        jd = await fs.readFile(jdPath, "utf-8");
        }
const prompt = `
You are an expert AI resume reviewer.

CRITICAL INSTRUCTIONS:
- Return ONLY ONE JSON object
- DO NOT include markdown formatting (no \`\`\`json or \`\`\`)
- DO NOT include any text before or after the JSON
- DO NOT repeat the JSON multiple times

Your task is to:
1. If only a resume is provided, identify the most likely job role the candidate is targeting.
2. If a job description (JD) is also provided, compare the resume with the JD.
3. Extract the candidate's full name from the resume.
4. Analyze the resume's strengths, weaknesses, formatting, and skills relevance.
5. Evaluate ATS compatibility and offer actionable improvement suggestions.
6. Return everything in valid JSON using the structure below.

Strict JSON format:

{
  "candidate_name": string,
  "guessed_role": string,
  "suitable_roles": [string],  // Based on resume: e.g., ["Frontend Developer", "Full Stack Developer"]
  "score": number (0–100),
  "short_summary": string,
  "job_description_summary": string,  // short 1–2 line summary of the JD if provided
  "ai_feedback_summary": string,  // short, friendly, overall AI comment/encouragement
  "strengths": [string],
  "areas_to_improve": [string],
  "formatting_feedback": [string],
  "example_rewrites": [
    { "original": string, "suggested": string }
  ],
  "section_feedback": {
    "summary": string,
    "experience": string,
    "skills": string,
    "projects": string,
    "education": string
  },
  "quality_breakdown": {
    "formatting": number,
    "clarity": number,
    "relevance": number,
    "conciseness": number,
    "action_verbs": number
  },
  "skills_match": {
    "matched": [string],
    "missing": [string]
  },
  "skills_match_score": number,  // out of 100
  "ats_compatibility": {
    "score": number (0–10),
    "issues": [string]
  },
  "ats_score_label": string,  // "Awesome", "Good", "Average", "Poor", "Needs Major Improvement"
  "personality_traits": [string],
  "weak_phrases": [string],
  "suggested_keywords": [string],
  "summary_cta_suggestions": [string],
  "project_analysis": [
    {
      "title": string,
      "score": number,
      "feedback": string
    }
  ],
  "common_mistakes": [string],
  "industry_tags": [string],
  "missing_links": [string],
  "redundant_content": [string],
  "tone_suggestion": string,
  "overall_professionalism": string
}

Only return a valid JSON object. DO NOT use markdown, backticks, or any surrounding text.

Resume:
${resume}

${jd ? `Job Description:\n${jd}` : ''}
`;





    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

const resultText = chatCompletion.choices[0]?.message?.content || "{}";
console.log(resultText)
let parsed;
try {
  parsed = JSON.parse(resultText);
} catch (parseErr) {
  console.error("❌ JSON parse error:", parseErr.message);
  return res.status(500).json({ message: "Invalid AI response format", raw: resultText });
}

res.json(parsed);


  } catch (err) {
    console.error("Error scoring resume:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};