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
You are an expert resume reviewer.

Your task is to:
1. If only resume is provided, first identify the most likely job role the person is applying for.
2. Based on that role, evaluate the resume.
3. If a job description is provided, compare the resume with the JD instead.

Return the result in this strict JSON format:

{
  "guessed_role": string (the likely job role, e.g., 'Full-Stack Developer'),
  "score": number (0–100),
  "short_summary": string (max 2 lines),
  "highlights": [list of 3–5 strengths],
  "improvement_tips": [list of 3–5 clear suggestions],
  "formatting_feedback": [list of formatting suggestions],
  "example_rewrites": [
    { "original": string, "suggested": string }
  ],
  "quality_breakdown": {
    "formatting": number (0–10),
    "clarity": number (0–10),
    "relevance": number (0–10),
    "conciseness": number (0–10),
    "action_verbs": number (0–10)
  },
  "skills_match": {
    "matched": [list of matched skills from JD if provided],
    "missing": [list of missing skills from JD if provided]
  }
}

Only return valid JSON. No extra explanation, markdown, or symbols.

Resume:
${resume}

${jd ? `Job Description:\n${jd}` : ''}
`;


    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

const resultText = chatCompletion.choices[0]?.message?.content || "{}";

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