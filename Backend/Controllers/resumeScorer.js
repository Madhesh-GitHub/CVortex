import fs from 'fs/promises';
import path from 'path';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const scoreResume = async (req, res) => {
  try {
    const { resumeFile, jdFile } = req.body;

    if (!resumeFile || !jdFile) {
      return res.status(400).json({ message: "Missing resumeFile or jdFile" });
    }

    const resumePath = path.join("parsed_content", resumeFile);
    const jdPath = path.join("parsed_content", jdFile);

    const resume = await fs.readFile(resumePath, "utf-8");
    const jd = await fs.readFile(jdPath, "utf-8");

    const prompt = `Give a matching score out of 100 for the resume against the job description and explain why. Also suggest improvements if needed.

    Job Description: ${jd}
    Resume: ${resume} `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama3-70b-8192",
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const result = chatCompletion.choices[0]?.message?.content || "No response";
    res.json({ result });

  } catch (err) {
    console.error("Error scoring resume:", err.message);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
