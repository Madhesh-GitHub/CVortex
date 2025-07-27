import fs from 'fs';
import path from 'path';

export const generateATSResumeHTML = (jsonData) => {
  const { personalInfo, workExperience, education, skills, achievements, languages, certificates } = jsonData;
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''} - Resume</title>
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
        
        .contact-item {
            display: flex;
            align-items: center;
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
        
        .work-item, .education-item, .achievement-item, .certificate-item {
            margin-bottom: 20px;
        }
        
        .work-title, .education-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .work-company, .education-institution {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }
        
        .work-duration, .education-duration {
            font-size: 13px;
            color: #888;
            margin-bottom: 10px;
        }
        
        .work-responsibilities {
            font-size: 14px;
            line-height: 1.6;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .skills-category {
            margin-bottom: 15px;
        }
        
        .skills-category-title {
            font-weight: bold;
            margin-bottom: 5px;
            color: #333;
        }
        
        .skills-list {
            font-size: 14px;
            line-height: 1.5;
        }
        
        .languages-grid, .certificates-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .language-item, .certificate-item {
            font-size: 14px;
        }
        
        .achievements-list {
            list-style: none;
        }
        
        .achievements-list li {
            margin-bottom: 10px;
            font-size: 14px;
            position: relative;
            padding-left: 20px;
        }
        
        .achievements-list li:before {
            content: "•";
            position: absolute;
            left: 0;
            font-weight: bold;
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
        <div class="name">${personalInfo?.firstName || ''} ${personalInfo?.lastName || ''}</div>
        ${personalInfo?.headline ? `<div class="headline">${personalInfo.headline}</div>` : ''}
        <div class="contact-info">
            ${personalInfo?.email ? `<div class="contact-item">${personalInfo.email}</div>` : ''}
            ${personalInfo?.phone ? `<div class="contact-item">${personalInfo.phone}</div>` : ''}
            ${personalInfo?.address?.city && personalInfo?.address?.state ? 
              `<div class="contact-item">${personalInfo.address.city}, ${personalInfo.address.state}</div>` : ''}
            ${personalInfo?.linkedIn ? `<div class="contact-item">${personalInfo.linkedIn}</div>` : ''}
            ${personalInfo?.portfolio ? `<div class="contact-item">${personalInfo.portfolio}</div>` : ''}
        </div>
    </div>

    <!-- Work Experience Section -->
    ${workExperience && workExperience.length > 0 ? `
    <div class="section">
        <div class="section-title">Professional Experience</div>
        ${workExperience.map(work => `
            <div class="work-item">
                <div class="work-title">${work.jobTitle || ''}</div>
                <div class="work-company">${work.companyName || ''} ${work.location ? `• ${work.location}` : ''}</div>
                <div class="work-duration">${work.startDate || ''} - ${work.isCurrent ? 'Present' : work.endDate || ''}</div>
                ${work.responsibilities ? `<div class="work-responsibilities">${work.responsibilities}</div>` : ''}
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
                <div class="education-title">${edu.degree || ''}</div>
                <div class="education-institution">${edu.institution || ''} ${edu.location ? `• ${edu.location}` : ''}</div>
                <div class="education-duration">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                ${edu.gpa ? `<div style="font-size: 14px; margin-top: 5px;">GPA: ${edu.gpa}</div>` : ''}
                ${edu.honors ? `<div style="font-size: 14px; margin-top: 5px;">${edu.honors}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

    <!-- Skills Section -->
    ${skills ? `
    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-grid">
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
        </div>
        ${skills.industrySkills ? `
        <div class="skills-category" style="margin-top: 15px;">
            <div class="skills-category-title">Industry Skills</div>
            <div class="skills-list">${skills.industrySkills}</div>
        </div>
        ` : ''}
    </div>
    ` : ''}

    <!-- Achievements Section -->
    ${achievements && achievements.length > 0 ? `
    <div class="section">
        <div class="section-title">Achievements</div>
        <ul class="achievements-list">
            ${achievements.map(achievement => `
                <li>
                    <strong>${achievement.title || ''}</strong>
                    ${achievement.description ? ` - ${achievement.description}` : ''}
                    ${achievement.date ? ` (${achievement.date})` : ''}
                </li>
            `).join('')}
        </ul>
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
                <div style="font-weight: bold; margin-bottom: 5px;">${cert.title || ''}</div>
                <div style="color: #666; margin-bottom: 5px;">${cert.issuer || ''} ${cert.issueDate ? `• ${cert.issueDate}` : ''}</div>
                ${cert.description ? `<div style="font-size: 14px;">${cert.description}</div>` : ''}
            </div>
        `).join('')}
    </div>
    ` : ''}

</body>
</html>`;
};