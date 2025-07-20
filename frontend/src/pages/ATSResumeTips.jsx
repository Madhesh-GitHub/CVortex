import React, { useState } from 'react';
import './ATSResumeTips.css';

const ATSResumeTips = () => {
  const [activeSection, setActiveSection] = useState('formatting');

  const tipsSections = {
    formatting: {
      title: "Formatting Best Practices",
      icon: "🎨",
      tips: [
        {
          title: "Keep It Simple",
          description: "Use clean, straightforward formatting without complex graphics or tables",
          details: "ATS systems struggle with complex designs. Stick to single-column layouts with clear headings."
        },
        {
          title: "Choose Standard Fonts",
          description: "Use professional fonts like Arial, Calibri, Cambria, or Verdana",
          details: "Font size should be 10-12pt for body text and 14-16pt for headings."
        },
        {
          title: "Avoid Headers and Footers",
          description: "Place all important information in the main body of your resume",
          details: "Many ATS systems cannot read content in headers and footers."
        },
        {
          title: "Use Consistent Date Formatting",
          description: "Format all dates consistently using MM/YYYY or Month Year",
          details: "Inconsistent date formats can confuse ATS and distort your job history."
        }
      ]
    },
    keywords: {
      title: "Keyword Optimization",
      icon: "🔍",
      tips: [
        {
          title: "Match Job Titles Exactly",
          description: "Include the exact job title from the posting in your resume",
          details: "Resumes with exact job titles are 10.6 times more likely to get interviews."
        },
        {
          title: "Use Keywords Naturally",
          description: "Incorporate job description keywords throughout your resume",
          details: "Use keywords exactly as they appear in the job posting for better matching."
        },
        {
          title: "Include Acronyms and Full Forms",
          description: "Write out both versions: 'Enterprise Resource Planning (ERP)'",
          details: "Recruiters might search for either the acronym or full term."
        },
        {
          title: "Tailor Skills Section",
          description: "Mirror your skills section to match job requirements",
          details: "Align your listed skills with those mentioned in the job description."
        }
      ]
    },
    content: {
      title: "Content Structure",
      icon: "📝",
      tips: [
        {
          title: "Use Strong Action Verbs",
          description: "Start bullet points with powerful verbs like 'led,' 'optimized,' 'executed'",
          details: "Avoid weak verbs like 'responsible for' or 'helped with.'"
        },
        {
          title: "Include Quantifiable Results",
          description: "Add numbers, percentages, and metrics to demonstrate impact",
          details: "Example: 'Increased sales by 25%' instead of 'Improved sales performance.'"
        },
        {
          title: "Follow Standard Sections",
          description: "Use conventional headings: Contact Info, Summary, Experience, Education, Skills",
          details: "ATS systems expect standard section names for proper parsing."
        },
        {
          title: "Write Compelling Summaries",
          description: "Create a professional summary that includes key qualifications",
          details: "Customize your summary for each application to match job requirements."
        }
      ]
    },
    technical: {
      title: "Technical Requirements",
      icon: "⚙️",
      tips: [
        {
          title: "Choose the Right File Format",
          description: "Save as .docx or PDF for best ATS compatibility",
          details: "Avoid image formats like .jpg or .png as they cannot be parsed."
        },
        {
          title: "Avoid Visual Elements",
          description: "Skip images, graphics, text boxes, and complex tables",
          details: "These elements can cause ATS systems to miss important information."
        },
        {
          title: "Use Simple Bullet Points",
          description: "Stick to standard bullet points (•) instead of decorative symbols",
          details: "Fancy bullets may not be recognized correctly by ATS systems."
        },
        {
          title: "Proofread Thoroughly",
          description: "Check for typos, spelling errors, and grammatical mistakes",
          details: "Errors can significantly impact your ATS score and professional image."
        }
      ]
    }
  };

  const commonMistakes = [
    "Using complex graphics and tables",
    "Placing contact info in headers/footers",
    "Using creative section headings",
    "Inconsistent date formatting",
    "Missing relevant keywords",
    "Using decorative fonts or symbols",
    "Saving in incompatible file formats",
    "Including irrelevant information"
  ];

  const quickChecklist = [
    "Resume saved as .docx or PDF",
    "Standard fonts (Arial, Calibri, etc.)",
    "Single-column, simple layout",
    "Job title matches posting exactly",
    "Keywords from job description included",
    "Contact info in main body",
    "Consistent date format throughout",
    "No spelling or grammar errors"
  ];

  return (
    <div className="ats-tips-container">
      <header className="tips-header">
        <h1>ATS Resume Tips & Best Practices</h1>
        <p>Master the art of creating ATS-friendly resumes that get past automated screening systems</p>
      </header>

      <nav className="tips-navigation">
        {Object.entries(tipsSections).map(([key, section]) => (
          <button
            key={key}
            className={`nav-button ${activeSection === key ? 'active' : ''}`}
            onClick={() => setActiveSection(key)}
          >
            <span className="nav-icon">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </nav>

      <main className="tips-content">
        <section className="active-tips-section">
          <h2>{tipsSections[activeSection].title}</h2>
          <div className="tips-grid">
            {tipsSections[activeSection].tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <h3>{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
                <div className="tip-details">
                  <small>{tip.details}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mistakes-section">
          <h2>🚫 Common ATS Mistakes to Avoid</h2>
          <div className="mistakes-grid">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="mistake-item">
                <span className="mistake-icon">❌</span>
                {mistake}
              </div>
            ))}
          </div>
        </section>

        <section className="checklist-section">
          <div className="checklist-outer-container">
            <h2>✅ ATS Optimization Checklist</h2>
            <div className="checklist-container">
              {quickChecklist.map((item, index) => (
                <label key={index} className="checklist-item">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  {item}
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="pro-tips">
          <h2>💡 Pro Tips</h2>
          <div className="pro-tips-content">
            <div className="pro-tip">
              <h3>Keyword Strategy</h3>
              <p>Read the job description multiple times and identify 10-15 key terms. Naturally incorporate these throughout your resume.</p>
            </div>
            <div className="pro-tip">
              <h3>Testing Your Resume</h3>
              <p>Copy your resume text and paste it into a plain text editor. If it looks readable, it's likely ATS-friendly.</p>
            </div>
            <div className="pro-tip">
              <h3>Customization is Key</h3>
              <p>Tailor your resume for each application. Generic resumes perform poorly in ATS systems.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ATSResumeTips;
