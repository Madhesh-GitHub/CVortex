import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    console.log('🔍 File filter - File:', file.originalname, file.mimetype);
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and DOCX are allowed.'));
    }
  }
});

export const parseResume = async (req, res) => {
  try {
    console.log('📁 Request received for direct analysis');

    // Check for resume file
    let resumeFile = null;
    if (req.files && req.files.resume && req.files.resume[0]) {
      resumeFile = req.files.resume[0];
    }

    if (!resumeFile) {
      console.error('❌ No resume file found');
      return res.status(400).json({ 
        message: 'No resume file uploaded'
      });
    }

    const jobDescription = req.body.jobDescription || '';
    console.log('📄 Processing:', resumeFile.originalname);
    console.log('📝 JD length:', jobDescription.length);

    // 🚀 DIRECT PARSING - No file storage needed
    let resumeText = '';
    
    try {
      if (resumeFile.mimetype === 'application/pdf') {
        console.log('📄 Parsing PDF...');
        const pdfData = await pdfParse(resumeFile.buffer);
        resumeText = pdfData.text;
      } else if (resumeFile.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        console.log('📄 Parsing DOCX...');
        const docxData = await mammoth.extractRawText({ buffer: resumeFile.buffer });
        resumeText = docxData.value;
      } else if (resumeFile.mimetype === 'application/msword') {
        console.log('📄 Parsing DOC...');
        const docxData = await mammoth.extractRawText({ buffer: resumeFile.buffer });
        resumeText = docxData.value;
      }
    } catch (parseError) {
      console.error('❌ File parsing error:', parseError);
      return res.status(400).json({ 
        message: 'Failed to parse resume file',
        error: parseError.message 
      });
    }

    if (!resumeText.trim()) {
      return res.status(400).json({ 
        message: 'Could not extract text from resume. Please ensure the file contains readable text.' 
      });
    }

    console.log('✅ Text extracted:', resumeText.length, 'characters');

    // 🚀 DIRECT LLM ANALYSIS - No intermediate storage
    console.log('🤖 Starting direct LLM analysis...');

    const prompt = `
You are an expert AI resume reviewer and ATS compatibility analyzer.

CRITICAL INSTRUCTIONS:
- Return ONLY ONE valid JSON object
- DO NOT include markdown formatting (no \`\`\`json or \`\`\`)
- DO NOT include any text before or after the JSON
- Ensure all JSON fields are properly formatted

ANALYSIS TASKS:
1. Extract candidate's full name from the resume
2. Identify the most likely target job role
3. If job description is provided, compare resume against it
4. Analyze resume quality, ATS compatibility, and provide improvement suggestions
5. Score the resume on a scale of 0-100

Return this EXACT JSON structure:

{
  "candidate_name": "string",
  "guessed_role": "string", 
  "suitable_roles": ["string", "string"],
  "score": 85,
  "short_summary": "Brief 2-3 sentence summary of the resume",
  "job_description_summary": "${jobDescription.trim() ? 'Summary of how well the resume matches the job requirements' : 'No job description provided - general analysis performed'}",
  "ai_feedback_summary": "Overall assessment and key recommendations",
  "strengths": ["strength1", "strength2", "strength3"],
  "areas_to_improve": ["improvement1", "improvement2", "improvement3"],
  "formatting_feedback": ["format tip1", "format tip2"],
  "example_rewrites": [
    { "original": "original text", "suggested": "improved version" }
  ],
  "section_feedback": {
    "summary": "Feedback on resume summary/objective",
    "experience": "Feedback on work experience section",
    "skills": "Feedback on skills section", 
    "projects": "Feedback on projects section",
    "education": "Feedback on education section"
  },
  "quality_breakdown": {
    "formatting": 80,
    "clarity": 75,
    "relevance": 90,
    "conciseness": 70,
    "action_verbs": 85
  },
  "skills_match": {
    "matched": ["skill1", "skill2"],
    "missing": ["skill3", "skill4"]
  },
  "skills_match_score": 75,
  "ats_compatibility": {
    "score": 8,
    "issues": ["issue1", "issue2"]
  },
  "ats_score_label": "Good",
  "personality_traits": ["trait1", "trait2"],
  "weak_phrases": ["phrase1", "phrase2"],
  "suggested_keywords": ["keyword1", "keyword2"],
  "summary_cta_suggestions": ["suggestion1", "suggestion2"],
  "project_analysis": [
    {
      "title": "project name",
      "score": 80,
      "feedback": "project feedback"
    }
  ],
  "common_mistakes": ["mistake1", "mistake2"],
  "industry_tags": ["industry1", "industry2"],
  "missing_links": ["missing1", "missing2"],
  "redundant_content": ["redundant1", "redundant2"],
  "tone_suggestion": "Professional tone recommendation",
  "overall_professionalism": "Assessment of professional presentation"
}

RESUME CONTENT:
${resumeText}

${jobDescription.trim() ? `\nJOB DESCRIPTION FOR COMPARISON:\n${jobDescription}` : ''}

Return only the JSON object, no other text.`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_completion_tokens: 1500,
        top_p: 1,
        stream: false,
      });

      const resultText = chatCompletion.choices[0]?.message?.content || "{}";
      console.log("🤖 LLM response received, length:", resultText.length);
      
      let aiAnalysis;
      try {
        aiAnalysis = JSON.parse(resultText);
        console.log("✅ JSON parsing successful");
      } catch (parseErr) {
        console.error("❌ JSON parse error:", parseErr.message);
        console.log("Raw response:", resultText.substring(0, 500) + "...");
        
        // Fallback analysis
        aiAnalysis = {
          candidate_name: "Unable to extract",
          guessed_role: "General Professional",
          score: 70,
          short_summary: "Resume analysis completed but response formatting issue occurred.",
          strengths: ["Experience present", "Education included"],
          areas_to_improve: ["Improve formatting", "Add more details"],
          ats_compatibility: { score: 6, issues: ["Format optimization needed"] },
          error: "AI response formatting issue"
        };
      }

      // Generate session info for tracking (optional)
      const sessionId = Date.now() + '-' + Math.floor(Math.random() * 1000000000);

      // 🎉 DIRECT RESPONSE - No file storage needed
      res.json({
        success: true,
        message: 'Resume analyzed successfully',
        sessionId,
        originalFilename: resumeFile.originalname,
        hasJobDescription: !!jobDescription.trim(),
        analysis: aiAnalysis,
        timestamp: new Date().toISOString()
      });

      console.log('✅ Direct analysis completed successfully');

    } catch (aiError) {
      console.error('❌ LLM analysis error:', aiError);
      res.status(500).json({
        success: false,
        message: 'AI analysis failed',
        error: aiError.message,
        fallback: {
          score: 60,
          message: "Technical issue during analysis. Please try again."
        }
      });
    }

  } catch (error) {
    console.error('❌ General error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Resume processing failed', 
      error: error.message 
    });
  }
};
