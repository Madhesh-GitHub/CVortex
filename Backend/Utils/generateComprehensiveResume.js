import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enhanced data parser for your text format
export const parseResumeData = (textData) => {
  const sections = {
    personalInfo: {},
    workExperience: [],
    education: [],
    skills: {},
    achievements: [],
    languages: [],
    certificates: []
  };

  const lines = textData.split('\n');
  let currentSection = '';
  let currentObject = {};
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('=== PERSONAL DATA ===')) {
      currentSection = 'personal';
      continue;
    } else if (line.includes('=== WORK_EXPERIENCE DATA ===')) {
      currentSection = 'work';
      continue;
    } else if (line.includes('=== EDUCATION DATA ===')) {
      currentSection = 'education';
      continue;
    } else if (line.includes('=== SKILLS DATA ===')) {
      currentSection = 'skills';
      continue;
    } else if (line.includes('=== ACHIEVEMENTSANDAWARDS DATA ===')) {
      currentSection = 'achievements';
      continue;
    } else if (line.includes('=== LANGUAGES DATA ===')) {
      currentSection = 'languages';
      continue;
    } else if (line.includes('=== CERTIFICATE DATA ===')) {
      currentSection = 'certificates';
      continue;
    }
    
    if (line && line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      
      switch (currentSection) {
        case 'personal':
          sections.personalInfo[key.trim()] = value;
          break;
          
        case 'work':
          if (key.trim() === 'jobTitle') {
            if (Object.keys(currentObject).length > 0) {
              sections.workExperience.push({...currentObject});
            }
            currentObject = { jobTitle: value };
          } else {
            currentObject[key.trim()] = value;
          }
          break;
          
        case 'education':
          if (key.trim() === 'degree') {
            if (Object.keys(currentObject).length > 0) {
              sections.education.push({...currentObject});
            }
            currentObject = { degree: value };
          } else {
            currentObject[key.trim()] = value;
          }
          break;
          
        case 'skills':
          if (key.trim() === 'technicalSkills') {
            // Parse technical skills JSON
            try {
              const skillsArray = value.split(', ').map(skill => {
                const parsed = JSON.parse(skill);
                return parsed.name;
              });
              sections.skills.technicalSkills = skillsArray;
            } catch (e) {
              sections.skills.technicalSkills = [value];
            }
          } else {
            sections.skills[key.trim()] = value;
          }
          break;
          
        case 'achievements':
          if (key.trim() === 'achievements') {
            try {
              const achievement = JSON.parse(value);
              sections.achievements.push(achievement);
            } catch (e) {
              sections.achievements.push({ title: value });
            }
          }
          break;
          
        case 'languages':
          if (key.trim().match(/^\d+$/)) {
            try {
              const language = JSON.parse(value);
              sections.languages.push(language);
            } catch (e) {
              sections.languages.push({ language: value, proficiency: 'Not specified' });
            }
          }
          break;
          
        case 'certificates':
          if (key.trim() === 'title') {
            if (Object.keys(currentObject).length > 0) {
              sections.certificates.push({...currentObject});
            }
            currentObject = { title: value };
          } else {
            currentObject[key.trim()] = value;
          }
          break;
      }
    }
  }
  
  // Add last objects
  if (currentSection === 'work' && Object.keys(currentObject).length > 0) {
    sections.workExperience.push({...currentObject});
  }
  if (currentSection === 'education' && Object.keys(currentObject).length > 0) {
    sections.education.push({...currentObject});
  }
  if (currentSection === 'certificates' && Object.keys(currentObject).length > 0) {
    sections.certificates.push({...currentObject});
  }
  
  return sections;
};

// Comprehensive HTML generator
export const generateComprehensiveResumeHTML = (parsedData) => {
  const { personalInfo, workExperience, education, skills, achievements, languages, certificates } = parsedData;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo.firstName || ''} ${personalInfo.lastName || ''} - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 8.5in;
            margin: 0 auto;
            padding: 0.5in;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
        }
        
        .name {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .headline {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
            font-style: italic;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;
        }
        
        .section {
            margin-bottom: 25px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #ccc;
            padding-bottom: 5px;
            margin-bottom: 15px;
            letter-spacing: 0.5px;
        }
        
        .experience-item, .education-item, .certificate-item {
            margin-bottom: 20px;
            padding-left: 10px;
        }
        
        .job-title, .degree-title, .cert-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .company, .institution, .issuer {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .duration, .dates {
            font-size: 13px;
            color: #888;
            margin-bottom: 10px;
        }
        
        .description, .responsibilities {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 10px;
        }
        
        .skills-section {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .skills-category {
            margin-bottom: 15px;
        }
        
        .skills-category-title {
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
            font-size: 14px;
        }
        
        .skills-list {
            font-size: 14px;
            line-height: 1.5;
        }
        
        .achievement-item {
            margin-bottom: 15px;
            padding-left: 20px;
            position: relative;
        }
        
        .achievement-item:before {
            content: "•";
            position: absolute;
            left: 0;
            font-weight: bold;
            color: #333;
        }
        
        .languages-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .language-item {
            font-size: 14px;
            padding: 8px;
            background: #f9f9f9;
            border-radius: 4px;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 0.3in;
                font-size: 12px;
            }
            .name {
                font-size: 24px;
            }
            .section-title {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <div class="header">
        <div class="name">${personalInfo.firstName || ''} ${personalInfo.lastName || ''}</div>
        ${personalInfo.headline ? `<div class="headline">${personalInfo.headline}</div>` : ''}
        <div class="contact-info">
            ${personalInfo.email ? `<span>${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>${personalInfo.phone}</span>` : ''}
            ${personalInfo.city && personalInfo.state ? `<span>${personalInfo.city}, ${personalInfo.state}</span>` : ''}
            ${personalInfo.linkedIn ? `<span>${personalInfo.linkedIn}</span>` : ''}
            ${personalInfo.portfolio ? `<span>${personalInfo.portfolio}</span>` : ''}
        </div>
    </div>

    <!-- Work Experience Section -->
    ${workExperience && workExperience.length > 0 ? `
    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${workExperience.map(work => `
            <div class="experience-item">
                <div class="job-title">${work.jobTitle || ''}</div>
                <div class="company">${work.companyName || ''}</div>
                <div class="duration">${work.startDate || ''} - ${work.isCurrent === 'true' ? 'Present' : work.endDate || ''}</div>
                ${work.responsibilities ? `<div class="responsibilities">${work.responsibilities}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Education Section -->
    ${education && education.length > 0 ? `
    <div class="section">
        <div class="section-title">Education</div>
        ${education.map(edu => `
            <div class="education-item">
                <div class="degree-title">${edu.degree || ''}</div>
                <div class="institution">${edu.institution || ''} ${edu.location ? `• ${edu.location}` : ''}</div>
                <div class="dates">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                ${edu.gpa ? `<div style="font-size: 14px; margin-top: 5px;">GPA: ${edu.gpa}</div>` : ''}
                ${edu.coursework ? `<div style="font-size: 14px; margin-top: 5px;"><strong>Coursework:</strong> ${edu.coursework}</div>` : ''}
                ${edu.honors ? `<div style="font-size: 14px; margin-top: 5px;"><strong>Honors:</strong> ${edu.honors}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Skills Section -->
    ${skills && (skills.technicalSkills || skills.softSkills || skills.industrySkills) ? `
    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-section">
            ${skills.technicalSkills ? `
            <div class="skills-category">
                <div class="skills-category-title">Technical Skills</div>
                <div class="skills-list">${Array.isArray(skills.technicalSkills) ? skills.technicalSkills.join(', ') : skills.technicalSkills}</div>
            </div>
            ` : ''}
            ${skills.softSkills ? `
            <div class="skills-category">
                <div class="skills-category-title">Soft Skills</div>
                <div class="skills-list">${skills.softSkills}</div>
            </div>
            ` : ''}
            ${skills.industrySkills ? `
            <div class="skills-category">
                <div class="skills-category-title">Industry Skills</div>
                <div class="skills-list">${skills.industrySkills}</div>
            </div>
            ` : ''}
        </div>
    </div>
    ` : ''}

    <!-- Achievements Section -->
    ${achievements && achievements.length > 0 ? `
    <div class="section">
        <div class="section-title">Achievements & Awards</div>
        ${achievements.map(achievement => `
            <div class="achievement-item">
                <strong>${achievement.title || ''}</strong>
                ${achievement.description ? ` - ${achievement.description}` : ''}
                ${achievement.date ? ` (${achievement.date})` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Languages Section -->
    ${languages && languages.length > 0 ? `
    <div class="section">
        <div class="section-title">Languages</div>
        <div class="languages-grid">
            ${languages.map(lang => `
                <div class="language-item">
                    <strong>${lang.language || ''}</strong> - ${lang.proficiency || ''}
                </div>
            `).join('')}
        </div>
    </div>
    ` : ''}

    <!-- Certificates Section -->
    ${certificates && certificates.length > 0 ? `
    <div class="section">
        <div class="section-title">Certifications</div>
        ${certificates.map(cert => `
            <div class="certificate-item">
                <div class="cert-title">${cert.title || ''}</div>
                <div class="issuer">${cert.issuer || ''} ${cert.issueDate ? `• ${cert.issueDate}` : ''}</div>
                ${cert.description ? `<div class="description">${cert.description}</div>` : ''}
                ${cert.credentialUrl ? `<div style="font-size: 12px; color: #666; margin-top: 5px;">Credential: ${cert.credentialUrl}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

</body>
</html>`;
};