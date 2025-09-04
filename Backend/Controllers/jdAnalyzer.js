import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const analyzeJobDescription = async (req, res) => {
  try {
    const { jobDescription, jobTitle } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a detailed job description (minimum 50 characters)'
      });
    }

    console.log('🔍 Analyzing job description with AI...');

    const prompt = `
You are an expert career advisor and ATS specialist. Analyze the following job description and provide comprehensive insights for resume optimization.

Job Title: ${jobTitle || 'Not specified'}
Job Description: ${jobDescription}

Return your analysis in this strict JSON format:

{
  "job_title": "string (extracted or provided job title)",
  "company_type": "string (startup, enterprise, tech company, etc.)",
  "experience_level": "string (entry, mid, senior, executive)",
  "key_requirements": {
    "must_have_skills": ["array of 8-12 essential technical skills"],
    "preferred_skills": ["array of 5-8 nice-to-have skills"],
    "soft_skills": ["array of 5-7 important soft skills"],
    "certifications": ["array of relevant certifications if any"],
    "experience_requirements": "string (years and type of experience needed)"
  },
  "critical_keywords": {
    "exact_match": ["array of 15-20 keywords that should appear exactly as written"],
    "variations": ["array of 10-15 keyword variations and synonyms"],
    "action_verbs": ["array of 8-10 powerful action verbs from the JD"],
    "industry_terms": ["array of 6-8 industry-specific terms"]
  },
  "resume_optimization": {
    "summary_focus": "string (what to emphasize in resume summary)",
    "experience_highlights": ["array of 4-6 types of experience to highlight"],
    "skills_prioritization": ["array of top 10 skills to feature prominently"],
    "achievement_metrics": ["array of 3-5 types of metrics/numbers to include"]
  },
  "ats_insights": {
    "formatting_tips": ["array of 3-4 ATS-specific formatting recommendations"],
    "section_priorities": ["array of resume sections in order of importance"],
    "common_mistakes": ["array of 3-4 things to avoid for this specific role"]
  },
  "improvement_areas": ["array of 4-6 specific areas where candidates often fall short"],
  "competitive_edge": ["array of 3-5 unique selling points that would stand out"]
}

Ensure all arrays contain relevant, specific, and actionable items. Focus on practical advice that will help optimize a resume for this specific job.
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
    });

    const responseContent = chatCompletion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error('No response from AI service');
    }

    // Extract JSON from the response
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    console.log('✅ Job description analysis completed');

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ JD Analysis error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to analyze job description. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};