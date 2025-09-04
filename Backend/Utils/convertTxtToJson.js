import fs from 'fs';
import path from 'path';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const convertTxtToJson = async (filename) => {
  try {
    // Paths
    const txtFilePath = path.join(process.cwd(), 'parsed_content', filename);
    const jsonDir = path.join(process.cwd(), 'parsed_json');
    const jsonFilename = filename.replace('.txt', '.json');
    const jsonFilePath = path.join(jsonDir, jsonFilename);

    console.log('📁 Converting:', filename);
    console.log('📄 Reading from:', txtFilePath);

    // Create parsed_json directory if it doesn't exist
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir, { recursive: true });
      console.log('📁 Created parsed_json directory');
    }

    // Check if txt file exists
    if (!fs.existsSync(txtFilePath)) {
      throw new Error(`Resume file not found: ${filename}`);
    }

    // Read the resume text
    const resumeText = fs.readFileSync(txtFilePath, 'utf-8');
    console.log('📄 Resume text length:', resumeText.length);

    // Create a more specific prompt for JSON conversion
    const prompt = `Extract ALL information from this resume and return ONLY a valid JSON object. Be comprehensive and capture every detail.

Resume Text:
${resumeText}

Return ONLY this JSON structure with ALL available data from the resume:
{
  "name": "Full name from resume",
  "email": "email@example.com", 
  "phone": "phone number",
  "location": "location/address",
  "linkedin": "LinkedIn URL or profile text",
  "github": "GitHub URL or profile text",
  "portfolio": "Portfolio URL if mentioned",
  "careerObjective": "Career objective or professional summary",
  "education": [
    {
      "institution": "School/University name",
      "degree": "Degree type and field",
      "duration": "Start - End dates",
      "grade": "GPA/Percentage/CGPA",
      "location": "City, State if mentioned"
    }
  ],
  "skills": {
    "Programming Languages": ["language1", "language2"],
    "Web Technologies": ["tech1", "tech2"],
    "Databases": ["db1", "db2"],
    "Tools": ["tool1", "tool2"],
    "Other": ["other skills"]
  },
  "experience": [
    {
      "company": "Company/Organization name",
      "position": "Job title/Role", 
      "duration": "Start - End dates",
      "location": "Location if mentioned",
      "type": "Full-time/Internship/Part-time",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2"
      ]
    }
  ],
  "internships": [
    {
      "company": "Organization name",
      "position": "Internship title",
      "duration": "Start - End dates",
      "type": "Virtual/On-site",
      "description": [
        "What you learned/did",
        "Skills gained"
      ]
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "duration": "Project timeline",
      "technologies": "Technologies used",
      "links": {
        "demo": "Live demo link if available",
        "github": "GitHub link if available"
      },
      "description": [
        "Project detail 1",
        "Project detail 2"
      ]
    }
  ],
  "achievements": [
    "Achievement 1 with details",
    "Achievement 2 with details"
  ],
  "certifications": [
    "Certification 1 - Provider",
    "Certification 2 - Provider"
  ],
  "technicalProfiles": [
    {
      "platform": "LeetCode/CodeChef/GitHub",
      "username": "username if available",
      "details": "rank/problems solved"
    }
  ],
  "leadership": [
    "Leadership role 1",
    "Leadership role 2"
  ],
  "activities": [
    "Activity 1",
    "Activity 2"
  ],
  "hobbies": [
    "Hobby 1",
    "Hobby 2"
  ],
  "languages": [
    "Language 1 - Proficiency level",
    "Language 2 - Proficiency level"
  ]
}

Return ONLY the JSON object, no other text.`;

    // Call Groq API
    console.log('🤖 Converting to JSON using Groq...');
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1, // Lower temperature for more consistent output
      max_completion_tokens: 2048,
      top_p: 1,
      stream: false,
    });

    let jsonResponse = chatCompletion.choices[0]?.message?.content || "{}";
    console.log('📝 Raw response from Groq (first 200 chars):', jsonResponse.substring(0, 200));

    // Clean the response to extract only JSON
    jsonResponse = cleanJsonResponse(jsonResponse);
    console.log('🧹 Cleaned response (first 200 chars):', jsonResponse.substring(0, 200));

    // Parse and validate JSON
    let parsedJson;
    try {
      parsedJson = JSON.parse(jsonResponse);
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON parsing error:', parseError.message);
      console.error('❌ Problematic JSON:', jsonResponse.substring(0, 500));
      
      // Fallback: try to create a basic structure
      parsedJson = createFallbackJson(resumeText);
      console.log('🔄 Using fallback JSON structure');
    }

    // Save JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(parsedJson, null, 2), 'utf-8');
    console.log('✅ JSON saved to:', jsonFilename);

    return {
      success: true,
      message: 'Resume converted to JSON successfully',
      jsonFile: jsonFilename,
      data: parsedJson
    };

  } catch (error) {
    console.error('❌ Error in convertTxtToJson:', error.message);
    throw error;
  }
};

// Helper function to clean JSON response from LLM
const cleanJsonResponse = (response) => {
  // Remove any text before the first '{'
  let cleanedResponse = response;
  
  // Find the first occurrence of '{'
  const firstBrace = cleanedResponse.indexOf('{');
  if (firstBrace !== -1) {
    cleanedResponse = cleanedResponse.substring(firstBrace);
  }
  
  // Find the last occurrence of '}'
  const lastBrace = cleanedResponse.lastIndexOf('}');
  if (lastBrace !== -1) {
    cleanedResponse = cleanedResponse.substring(0, lastBrace + 1);
  }
  
  // Remove any markdown code block markers
  cleanedResponse = cleanedResponse.replace(/```json\s*/g, '');
  cleanedResponse = cleanedResponse.replace(/```\s*/g, '');
  
  // Remove any trailing text after the JSON
  cleanedResponse = cleanedResponse.replace(/\n\n.*$/s, '');
  
  return cleanedResponse.trim();
};

// Helper function to create fallback JSON structure
const createFallbackJson = (resumeText) => {
  const lines = resumeText.split('\n').filter(line => line.trim());
  
  // Try to extract basic info
  const emailMatch = resumeText.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const phoneMatch = resumeText.match(/(\+?\d[\d\s\-\(\)]{8,})/);
  
  return {
    name: lines[0] || "Name not found",
    email: emailMatch ? emailMatch[1] : "",
    phone: phoneMatch ? phoneMatch[1] : "",
    location: "",
    linkedin: "",
    github: "",
    summary: "Professional summary not available",
    education: [{
      institution: "Education details not parsed",
      degree: "",
      duration: "",
      grade: ""
    }],
    skills: {
      "Technical Skills": ["Skills not parsed"]
    },
    experience: [],
    projects: [],
    achievements: [],
    certifications: [],
    languages: []
  };
};