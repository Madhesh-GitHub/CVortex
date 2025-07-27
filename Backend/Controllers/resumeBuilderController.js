import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ResumeBuilderController {
  constructor() {
    this.uploadsDir = path.join(__dirname, '../uploads');
    this.dataFile = path.join(this.uploadsDir, 'data.txt');
    
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  // Start new resume building session - clear existing data
  startSession = (req, res) => {
    try {
      const sessionId = uuidv4();
      
      // Clear the existing data.txt file for new session
      fs.writeFileSync(this.dataFile, '');
      
      res.json({
        success: true,
        sessionId,
        message: 'Resume building session started successfully - data cleared'
      });
      
    } catch (error) {
      console.error('Error starting session:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to start session',
        error: error.message
      });
    }
  };

  // Save form step data - integrate with existing format
  saveStepData = (req, res) => {
    try {
      const { sessionId } = req.params; // This will be undefined if not provided
      const { step, data } = req.body;
      
      console.log('📥 Saving step data:', { step, sessionId: sessionId || 'none', dataKeys: Object.keys(data) });
      
      // Read existing data
      let existingContent = '';
      if (fs.existsSync(this.dataFile)) {
        existingContent = fs.readFileSync(this.dataFile, 'utf-8');
      }
      
      // Remove existing section for this step if it exists
      const cleanedContent = this.removeExistingSection(existingContent, step);
      
      // Generate new section content
      const newSectionContent = this.generateSectionContent(step, data);
      
      // Combine cleaned content with new section
      const updatedContent = cleanedContent + newSectionContent;
      
      // Write back to file
      fs.writeFileSync(this.dataFile, updatedContent);
      
      console.log(`✅ ${step} data saved successfully`);
      
      res.json({
        success: true,
        message: `${step} data saved successfully`
      });
      
    } catch (error) {
      console.error('Error saving step data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to save step data',
        error: error.message
      });
    }
  };

  // Remove existing section from content
  removeExistingSection = (content, step) => {
    const sectionHeaders = {
      personalInfo: '=== PERSONAL DATA ===',
      workExperience: '=== WORK_EXPERIENCE DATA ===',
      education: '=== EDUCATION DATA ===',
      skills: '=== SKILLS DATA ===',
      achievements: '=== ACHIEVEMENTS DATA ===',
      languages: '=== LANGUAGES DATA ===',
      certificates: '=== CERTIFICATE DATA ==='
    };
    
    const header = sectionHeaders[step];
    if (!header || !content.includes(header)) {
      return content;
    }
    
    const sections = content.split(/=== \w+ DATA ===/);
    const headers = content.match(/=== \w+ DATA ===/g) || [];
    
    let result = '';
    for (let i = 0; i < headers.length; i++) {
      if (headers[i] !== header) {
        result += headers[i] + sections[i + 1];
      }
    }
    
    return result;
  };

  // Generate section content in your existing format
  generateSectionContent = (step, data) => {
    let content = '';
    
    switch (step) {
      case 'personalInfo':
        content += '=== PERSONAL DATA ===\n';
        content += `firstName: ${data.firstName || ''}\n`;
        content += `lastName: ${data.lastName || ''}\n`;
        content += `email: ${data.email || ''}\n`;
        content += `phone: ${data.phone || ''}\n`;
        content += `linkedIn: ${data.linkedIn || ''}\n`;
        content += `portfolio: ${data.portfolio || ''}\n`;
        content += `headline: ${data.headline || ''}\n`;
        content += `street: ${data.street || ''}\n`;
        content += `apartment: ${data.apartment || ''}\n`;
        content += `city: ${data.city || ''}\n`;
        content += `state: ${data.state || ''}\n`;
        content += `zip: ${data.zip || ''}\n`;
        content += `country: ${data.country || ''}\n`;
        content += `remote: ${data.remote || false}\n`;
        content += `relocate: ${data.relocate || false}\n\n`;
        break;
        
      case 'workExperience':
        content += '=== WORK_EXPERIENCE DATA ===\n';
        if (Array.isArray(data)) {
          data.forEach((exp, index) => {
            content += `${index}: {\n`;
            content += `  jobTitle: ${exp.jobTitle || ''}\n`;
            content += `  companyName: ${exp.companyName || ''}\n`;
            content += `  startDate: ${exp.startDate || ''}\n`;
            content += `  endDate: ${exp.endDate || ''}\n`;
            content += `  isCurrent: ${exp.isCurrent || false}\n`;
            content += `  location: ${exp.location || ''}\n`;
            content += `  responsibilities: ${exp.responsibilities || ''}\n`;
            content += `}\n`;
          });
        } else {
          // Single work experience object
          content += `jobTitle: ${data.jobTitle || ''}\n`;
          content += `companyName: ${data.companyName || ''}\n`;
          content += `startDate: ${data.startDate || ''}\n`;
          content += `endDate: ${data.endDate || ''}\n`;
          content += `isCurrent: ${data.isCurrent || false}\n`;
          content += `responsibilities: ${data.responsibilities || ''}\n`;
        }
        content += '\n';
        break;
        
      case 'education':
        content += '=== EDUCATION DATA ===\n';
        if (Array.isArray(data)) {
          data.forEach((edu, index) => {
            content += `${index}: {\n`;
            content += `  degree: ${edu.degree || ''}\n`;
            content += `  institution: ${edu.institution || ''}\n`;
            content += `  location: ${edu.location || ''}\n`;
            content += `  gpa: ${edu.gpa || ''}\n`;
            content += `  startDate: ${edu.startDate || ''}\n`;
            content += `  endDate: ${edu.endDate || ''}\n`;
            content += `  coursework: ${edu.coursework || ''}\n`;
            content += `  honors: ${edu.honors || ''}\n`;
            content += `}\n`;
          });
        } else {
          // Single education object
          content += `degree: ${data.degree || ''}\n`;
          content += `institution: ${data.institution || ''}\n`;
          content += `location: ${data.location || ''}\n`;
          content += `gpa: ${data.gpa || ''}\n`;
          content += `startDate: ${data.startDate || ''}\n`;
          content += `endDate: ${data.endDate || ''}\n`;
          content += `coursework: ${data.coursework || ''}\n`;
          content += `honors: ${data.honors || ''}\n`;
        }
        content += '\n';
        break;
        
      case 'skills':
        content += '=== SKILLS DATA ===\n';
        if (data.technicalSkills) {
          if (Array.isArray(data.technicalSkills)) {
            content += `technicalSkills: ${data.technicalSkills.map(skill => JSON.stringify(skill)).join(', ')}\n`;
          } else {
            content += `technicalSkills: ${JSON.stringify(data.technicalSkills)}\n`;
          }
        }
        content += `softSkills: ${data.softSkills || ''}\n`;
        content += `industrySkills: ${data.industrySkills || ''}\n`;
        content += '\n';
        break;
        
      case 'languages':
        content += '=== LANGUAGES DATA ===\n';
        if (Array.isArray(data)) {
          data.forEach((lang, index) => {
            content += `${index}: ${JSON.stringify(lang)}\n`;
          });
        }
        content += '\n';
        break;
        
      case 'certificates':
        content += '=== CERTIFICATE DATA ===\n';
        if (Array.isArray(data)) {
          data.forEach((cert, index) => {
            content += `${index}: {\n`;
            content += `  title: ${cert.title || cert.name || ''}\n`;
            content += `  issuer: ${cert.issuer || ''}\n`;
            content += `  issueDate: ${cert.issueDate || cert.date || ''}\n`;
            content += `  expiryDate: ${cert.expiryDate || ''}\n`;
            content += `  credentialId: ${cert.credentialId || ''}\n`;
            content += `  credentialUrl: ${cert.credentialUrl || cert.url || ''}\n`;
            content += `  description: ${cert.description || ''}\n`;
            content += `}\n`;
          });
        } else {
          // Single certificate object
          content += `title: ${data.title || data.name || ''}\n`;
          content += `issuer: ${data.issuer || ''}\n`;
          content += `issueDate: ${data.issueDate || data.date || ''}\n`;
          content += `expiryDate: ${data.expiryDate || ''}\n`;
          content += `credentialId: ${data.credentialId || ''}\n`;
          content += `credentialUrl: ${data.credentialUrl || data.url || ''}\n`;
          content += `description: ${data.description || ''}\n`;
        }
        content += '\n';
        break;
        
      case 'achievements':
        content += '=== ACHIEVEMENTS DATA ===\n';
        if (Array.isArray(data)) {
          data.forEach((achievement, index) => {
            content += `${index}: ${JSON.stringify(achievement)}\n`;
          });
        }
        content += '\n';
        break;
    }
    
    return content;
  };

  // Get current data from file
  getCurrentData = (req, res) => {
    try {
      if (fs.existsSync(this.dataFile)) {
        const content = fs.readFileSync(this.dataFile, 'utf-8');
        res.json({
          success: true,
          data: content
        });
      } else {
        res.json({
          success: true,
          data: ''
        });
      }
    } catch (error) {
      console.error('Error getting current data:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get current data',
        error: error.message
      });
    }
  };
}

export default new ResumeBuilderController();