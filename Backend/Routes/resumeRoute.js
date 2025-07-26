import express from "express";
import fs from "fs";
import path from "path";
import { convertTxtToJson } from "../Utils/convertTxtToJson.js";
import { scoreResume } from "../Controllers/resumeScorer.js";

const router = express.Router();

// Resume scoring route - FIXED PATH
router.post("/resume/score", async (req, res) => {
  try {
    console.log('📊 Score request received:', req.body);

    const resumeFileRaw = req.body?.resumeFile;
    const jdFileRaw = req.body?.jdFile;

    if (!resumeFileRaw) {
      return res.status(400).json({
        success: false,
        message: "Missing resumeFile",
      });
    }

    // Clean filenames
    const resumeFilename = resumeFileRaw.split("\\").pop();
    const jdFilename = jdFileRaw ? jdFileRaw.split("\\").pop() : null;

    console.log("📄 Processing files:", { resumeFilename, jdFilename });

    // Overwrite cleaned values
    req.body.resumeFile = resumeFilename;
    req.body.jdFile = jdFilename;

    await scoreResume(req, res);
  } catch (error) {
    console.error("❌ Error in resume scoring:", error);
    res.status(500).json({
      success: false,
      message: "Error scoring resume",
      error: error.message,
    });
  }
});


// Generate ATS Resume endpoint
router.get("/generate-ats-resume/:filename", async (req, res) => {
  try {
    const { filename } = req.params;
    
    console.log('🎯 Generating ATS resume for:', filename);
    
    const jsonDir = path.join(process.cwd(), 'parsed_json');
    const jsonFilename = filename.replace('.txt', '.json');
    const jsonFilePath = path.join(jsonDir, jsonFilename);

    // Check if JSON file exists, if not convert txt to json
    if (!fs.existsSync(jsonFilePath)) {
      console.log('📄 JSON not found, converting from txt...');
      await convertTxtToJson(filename);
    }

    // Read JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    console.log('✅ JSON data loaded successfully');

    // Generate clean HTML resume
    const resumeHTML = generateResumeHTML(jsonData);

    res.json({
      success: true,
      message: 'ATS Resume generated successfully',
      html: resumeHTML,
      data: jsonData
    });

  } catch (error) {
    console.error('❌ Error generating ATS resume:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error generating ATS resume',
      error: error.message
    });
  }
});

// Get latest resume file
router.get("/latest", async (req, res) => {
  try {
    const parsedDir = path.join(process.cwd(), "parsed_content");
    
    console.log('🔍 Looking for resumes in:', parsedDir);
    
    if (!fs.existsSync(parsedDir)) {
      return res.status(404).json({ 
        success: false,
        message: "No parsed resumes found" 
      });
    }
    
    const files = fs.readdirSync(parsedDir);
    const resumeFiles = files.filter(file => file.startsWith("resume_"));
    
    if (resumeFiles.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: "No resume found" 
      });
    }
    
    const latestFile = resumeFiles.sort().pop();
    console.log('📄 Latest file found:', latestFile);
    
    res.json({
      success: true,
      filename: latestFile,
      message: "Latest resume found"
    });
    
  } catch (error) {
    console.error('❌ Error in /latest:', error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching latest resume", 
      error: error.message 
    });
  }
});

// Helper function to generate comprehensive HTML resume
const generateResumeHTML = (data) => {
  // Helper function to ensure array format
  const ensureArray = (item) => {
    if (Array.isArray(item)) return item;
    if (typeof item === 'string') return [item];
    return [];
  };

  return `
    <div class="max-w-4xl mx-auto bg-white p-8 font-sans text-gray-900 leading-relaxed" style="font-size: 14px; line-height: 1.6;">
      <!-- Header -->
      <header class="text-center mb-8 border-b-2 border-gray-300 pb-6">
        <h1 class="text-4xl font-bold mb-3 text-gray-800">${data.name || 'Name Not Found'}</h1>
        <div class="text-sm text-gray-600 space-y-2">
          <div class="flex justify-center items-center gap-6 flex-wrap">
            ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
            ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
            ${data.location ? `<span>📍 ${data.location}</span>` : ''}
          </div>
          <div class="flex justify-center items-center gap-6 flex-wrap">
            ${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ''}
            ${data.github ? `<span>💻 ${data.github}</span>` : ''}
            ${data.portfolio ? `<span>🌐 ${data.portfolio}</span>` : ''}
          </div>
        </div>
      </header>

      ${data.careerObjective ? `
      <!-- Career Objective -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Career Objective</h2>
        <p class="text-sm leading-relaxed">${data.careerObjective}</p>
      </section>
      ` : ''}

      ${data.education && data.education.length > 0 ? `
      <!-- Education -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Education</h2>
        ${ensureArray(data.education).map(edu => `
          <div class="mb-4">
            <div class="flex justify-between items-start mb-1">
              <div>
                <p class="font-semibold text-sm">${edu.degree || 'Degree'}</p>
                <p class="text-sm font-medium">${edu.institution || 'Institution'}</p>  
                ${edu.location ? `<p class="text-xs text-gray-600">${edu.location}</p>` : ''}
              </div>
              <div class="text-right">
                ${edu.duration ? `<p class="text-sm text-gray-700">${edu.duration}</p>` : ''}
                ${edu.grade ? `<p class="text-sm font-semibold text-blue-600">${edu.grade}</p>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${data.skills && Object.keys(data.skills).length > 0 ? `
      <!-- Technical Skills -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Technical Skills</h2>
        <div class="grid grid-cols-1 gap-2">
          ${Object.entries(data.skills).map(([category, skills]) => `
            <p class="text-sm">
              <span class="font-semibold text-gray-700">${category}:</span> 
              <span>${Array.isArray(skills) ? skills.join(', ') : skills}</span>
            </p>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${data.experience && data.experience.length > 0 ? `
      <!-- Professional Experience -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Professional Experience</h2>
        ${ensureArray(data.experience).map(exp => `
          <div class="mb-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-semibold text-sm">${exp.position || 'Position'}</p>
                <p class="text-sm font-medium text-blue-600">${exp.company || 'Company'}</p>
                ${exp.location ? `<p class="text-xs text-gray-600">${exp.location}</p>` : ''}
              </div>
              <div class="text-right">
                ${exp.duration ? `<p class="text-sm text-gray-700">${exp.duration}</p>` : ''}
                ${exp.type ? `<p class="text-xs text-gray-500">${exp.type}</p>` : ''}
              </div>
            </div>
            ${exp.responsibilities ? `
              <ul class="text-sm space-y-1 ml-4">
                ${ensureArray(exp.responsibilities).map(resp => `<li>• ${resp}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${data.internships && data.internships.length > 0 ? `
      <!-- Internships -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Internships</h2>
        ${ensureArray(data.internships).map(intern => `
          <div class="mb-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-semibold text-sm">${intern.position || 'Internship'}</p>
                <p class="text-sm font-medium text-green-600">${intern.company || 'Organization'}</p>
              </div>
              <div class="text-right">
                ${intern.duration ? `<p class="text-sm text-gray-700">${intern.duration}</p>` : ''}
                ${intern.type ? `<p class="text-xs text-gray-500">${intern.type}</p>` : ''}
              </div>
            </div>
            ${intern.description ? `
              <ul class="text-sm space-y-1 ml-4">
                ${ensureArray(intern.description).map(desc => `<li>• ${desc}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${data.projects && data.projects.length > 0 ? `
      <!-- Projects -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Projects</h2>
        ${ensureArray(data.projects).map(project => `
          <div class="mb-4">
            <div class="flex justify-between items-start mb-1">
              <div>
                <p class="font-semibold text-sm">${project.name || 'Project Name'}</p>
                ${project.technologies ? `<p class="text-sm italic text-blue-600">Tech Stack: ${project.technologies}</p>` : ''}
                ${project.links ? `
                  <div class="text-xs text-gray-600 mt-1">
                    ${project.links.demo ? `<span>[Live Demo] </span>` : ''}
                    ${project.links.github ? `<span>[GitHub]</span>` : ''}
                  </div>
                ` : ''}
              </div>
              ${project.duration ? `<p class="text-sm text-gray-700">${project.duration}</p>` : ''}
            </div>
            ${project.description ? `
              <ul class="text-sm space-y-1 ml-4">
                ${ensureArray(project.description).map(desc => `<li>• ${desc}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${data.achievements && data.achievements.length > 0 ? `
      <!-- Achievements -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Achievements</h2>
        <ul class="text-sm space-y-2 ml-4">
          ${ensureArray(data.achievements).map(achievement => `<li>• ${achievement}</li>`).join('')}
        </ul>
      </section>
      ` : ''}

      ${data.certifications && data.certifications.length > 0 ? `
      <!-- Certifications -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Certifications</h2>
        <ul class="text-sm space-y-1 ml-4">
          ${ensureArray(data.certifications).map(cert => `<li>• ${cert}</li>`).join('')}
        </ul>
      </section>
      ` : ''}

      ${data.technicalProfiles && data.technicalProfiles.length > 0 ? `
      <!-- Technical Profiles -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Technical Profiles</h2>
        <div class="grid grid-cols-2 gap-3">
          ${ensureArray(data.technicalProfiles).map(profile => `
            <div class="text-sm">
              <span class="font-semibold">${profile.platform}:</span> 
              <span>${profile.details || profile.username || 'Profile available'}</span>
            </div>
          `).join('')}
        </div>
      </section>
      ` : ''}

      ${data.leadership && data.leadership.length > 0 ? `
      <!-- Leadership & Activities -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Leadership & Activities</h2>
        <ul class="text-sm space-y-1 ml-4">
          ${ensureArray(data.leadership).map(leader => `<li>• ${leader}</li>`).join('')}
          ${data.activities ? ensureArray(data.activities).map(activity => `<li>• ${activity}</li>`).join('') : ''}
        </ul>
      </section>
      ` : ''}

      ${data.hobbies && data.hobbies.length > 0 ? `
      <!-- Hobbies & Interests -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Hobbies & Interests</h2>
        <p class="text-sm">${ensureArray(data.hobbies).join(', ')}</p>
      </section>
      ` : ''}

      ${data.languages && data.languages.length > 0 ? `
      <!-- Languages -->
      <section class="mb-6">
        <h2 class="text-lg font-bold mb-3 border-b-2 border-gray-400 pb-2 uppercase text-gray-800">Languages</h2>
        <ul class="text-sm space-y-1 ml-4">
          ${ensureArray(data.languages).map(lang => `<li>• ${lang}</li>`).join('')}
        </ul>
      </section>
      ` : ''}
    </div>
  `;
};

export default router;