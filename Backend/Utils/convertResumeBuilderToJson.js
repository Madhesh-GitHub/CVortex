import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Groq from 'groq-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Groq with error handling
let groq;
try {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not set in environment variables');
  }
  
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
  console.log('✅ Groq API initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Groq API:', error.message);
}

export const convertResumeBuilderToJson = async () => {
  try {
    console.log('🚀 Starting convertResumeBuilderToJson...');
    
    // Check if Groq is initialized
    if (!groq) {
      throw new Error('Groq API is not properly initialized. Check your GROQ_API_KEY.');
    }
    
    const uploadsDir = path.join(__dirname, '../uploads');
    const dataFilePath = path.join(uploadsDir, 'data.txt');
    const resumeJsonDir = path.join(__dirname, '../resume_json');
    
    console.log('📁 Uploads directory:', uploadsDir);
    console.log('📄 Data file path:', dataFilePath);
    
    // Create resume_json directory if it doesn't exist
    if (!fs.existsSync(resumeJsonDir)) {
      fs.mkdirSync(resumeJsonDir, { recursive: true });
      console.log('📁 Created resume_json directory');
    }

    // Check if data.txt exists
    if (!fs.existsSync(dataFilePath)) {
      console.error('❌ Data file not found at:', dataFilePath);
      throw new Error('No resume data found. Please complete the resume builder first.');
    }

    // Read the resume data
    const resumeData = fs.readFileSync(dataFilePath, 'utf-8');
    console.log('📄 Resume data length:', resumeData.length);
    console.log('📄 Resume data preview:', resumeData.substring(0, 200) + '...');

    if (resumeData.trim().length === 0) {
      throw new Error('Resume data is empty. Please fill out the resume builder.');
    }

    // Create simplified prompt to avoid token limits
    const prompt = `Convert this resume data to JSON format. Return ONLY valid JSON:

${resumeData}

Expected JSON structure:
{
  "personalInfo": {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "linkedIn": "",
    "portfolio": "",
    "headline": ""
  },
  "workExperience": [],
  "education": [],
  "skills": {},
  "achievements": [],
  "languages": [],
  "certificates": []
}

Return ONLY the JSON, no explanations.`;

    console.log('🤖 Sending request to Groq...');
    console.log('📝 Prompt length:', prompt.length);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.1,
      max_tokens: 3000,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    console.log('🤖 LLM Response received');
    console.log('📝 Response length:', responseText.length);
    console.log('📝 Response preview:', responseText.substring(0, 200) + '...');

    // Clean and parse JSON
    let cleanedResponse = responseText.trim();
    
    // Remove any markdown code blocks
    if (cleanedResponse.includes('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleanedResponse.includes('```')) {
      cleanedResponse = cleanedResponse.replace(/```\s*/, '').replace(/```\s*$/, '');
    }
    
    // Find JSON content between braces
    const jsonStart = cleanedResponse.indexOf('{');
    const jsonEnd = cleanedResponse.lastIndexOf('}');
    
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error('No valid JSON found in LLM response');
    }
    
    cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd + 1);

    // Parse JSON
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedResponse);
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError.message);
      console.log('❌ Raw response:', responseText);
      console.log('❌ Cleaned response:', cleanedResponse);
      
      // Try to create a basic JSON structure as fallback
      parsedData = createFallbackJson(resumeData);
    }

    // Generate unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFilename = `resume_${timestamp}.json`;
    const jsonFilePath = path.join(resumeJsonDir, jsonFilename);

    // Save JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
    console.log('✅ JSON file saved:', jsonFilePath);

    return {
      success: true,
      message: 'Resume data converted to JSON successfully',
      jsonData: parsedData,
      filename: jsonFilename,
      filePath: jsonFilePath
    };

  } catch (error) {
    console.error('❌ Error in convertResumeBuilderToJson:', error);
    console.error('❌ Stack trace:', error.stack);
    throw error;
  }
};

// Fallback function to create basic JSON from text data
const createFallbackJson = (resumeData) => {
  console.log('🔄 Creating fallback JSON structure...');
  
  const lines = resumeData.split('\n');
  const result = {
    personalInfo: {},
    workExperience: [],
    education: [],
    skills: {},
    achievements: [],
    languages: [],
    certificates: []
  };
  
  let currentSection = '';
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.includes('=== PERSONAL DATA ===')) {
      currentSection = 'personal';
    } else if (trimmedLine.includes('=== WORK_EXPERIENCE DATA ===')) {
      currentSection = 'work';
    } else if (trimmedLine.includes('=== EDUCATION DATA ===')) {
      currentSection = 'education';
    } else if (trimmedLine.includes('=== SKILLS DATA ===')) {
      currentSection = 'skills';
    } else if (trimmedLine.includes('firstName:')) {
      result.personalInfo.firstName = trimmedLine.split(':')[1]?.trim() || '';
    } else if (trimmedLine.includes('lastName:')) {
      result.personalInfo.lastName = trimmedLine.split(':')[1]?.trim() || '';
    } else if (trimmedLine.includes('email:')) {
      result.personalInfo.email = trimmedLine.split(':')[1]?.trim() || '';
    } else if (trimmedLine.includes('phone:')) {
      result.personalInfo.phone = trimmedLine.split(':')[1]?.trim() || '';
    }
  }
  
  return result;
};