import express from 'express';
import resumeBuilderController from '../Controllers/resumeBuilderController.js';
import { parseResumeData, generateComprehensiveResumeHTML } from '../Utils/generateComprehensiveResume.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Start new resume building session (clears existing data)
router.post('/start-session', resumeBuilderController.startSession);

// Save step data (integrates with existing format)
router.post('/save-step', resumeBuilderController.saveStepData);

// Get current data
router.get('/current-data', resumeBuilderController.getCurrentData);

// Convert resume builder data to JSON and generate ATS resume
router.post('/generate-ats-resume', async (req, res) => {
  try {
    console.log('🎯 Starting comprehensive ATS resume generation...');
    
    // Check if data.txt exists and has content
    const uploadsDir = path.join(__dirname, '../uploads');
    const dataFilePath = path.join(uploadsDir, 'data.txt');
    
    console.log('📁 Checking data file at:', dataFilePath);
    
    if (!fs.existsSync(dataFilePath)) {
      console.error('❌ Data file not found');
      return res.status(400).json({
        success: false,
        message: 'No resume data found. Please complete the resume builder first.',
        error: 'Data file not found'
      });
    }
    
    const resumeData = fs.readFileSync(dataFilePath, 'utf-8');
    console.log('📄 Data file content length:', resumeData.length);
    console.log('📄 Data preview:', resumeData.substring(0, 300) + '...');
    
    if (resumeData.trim().length === 0) {
      console.error('❌ Data file is empty');
      return res.status(400).json({
        success: false,
        message: 'Resume data is empty. Please fill out the resume builder.',
        error: 'Empty data file'
      });
    }
    
    // Parse the text data into structured format
    console.log('🔄 Parsing resume data...');
    const parsedData = parseResumeData(resumeData);
    console.log('✅ Parsed data:', JSON.stringify(parsedData, null, 2));
    
    // Generate comprehensive HTML
    console.log('🎨 Generating comprehensive resume HTML...');
    const resumeHTML = generateComprehensiveResumeHTML(parsedData);
    
    console.log('✅ Comprehensive ATS resume generated successfully');
    
    // Save parsed JSON for reference
    const resumeJsonDir = path.join(__dirname, '../resume_json');
    if (!fs.existsSync(resumeJsonDir)) {
      fs.mkdirSync(resumeJsonDir, { recursive: true });
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const jsonFilename = `parsed_resume_${timestamp}.json`;
    const jsonFilePath = path.join(resumeJsonDir, jsonFilename);
    
    fs.writeFileSync(jsonFilePath, JSON.stringify(parsedData, null, 2));
    console.log('💾 Parsed JSON saved:', jsonFilename);
    
    res.json({
      success: true,
      message: 'Comprehensive ATS resume generated successfully',
      html: resumeHTML,
      jsonData: parsedData,
      jsonFilename: jsonFilename
    });
    
  } catch (error) {
    console.error('❌ Error generating comprehensive ATS resume:', error);
    console.error('❌ Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Failed to generate comprehensive ATS resume',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;