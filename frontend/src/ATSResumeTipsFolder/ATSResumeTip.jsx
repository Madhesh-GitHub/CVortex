import React, { useState } from 'react'

const ATSResumeTip = () => {
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
    <>
    <div className="min-h-screen w-full flex flex-col items-center box-border bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <header className='text-white flex flex-col gap-6 w-full mb-10 p-5 bg-gradient-to-br from-[#0f766e] via-[#0e7490] to-[#64748b]'>
            <h1 className='text-center text-3xl font-medium lg:text-4xl'>Optimized Resume Tips</h1>
            <h1 className='text-center text-2xl font-regular lg:text-3xl'>Create resumes that beat the bots.</h1>
        </header>
        <nav className="flex justify-center mb-10 flex-wrap gap-15 md:mb-12">
        {Object.entries(tipsSections).map(([key, section]) => (
          <button
            key={key}
           className={`text-lg flex items-center gap-2 px-5 py-5 border-2 rounded-2xl font-regular transition-all duration-300 ${activeSection === key ? 'bg-blue-600 text-white border-gray-400' : 'bg-gray-50 border-slate-400 text-black hover:bg-gray-200'}`}
            onClick={() => setActiveSection(key)}
          >
            <span className="text-lg">{section.icon}</span>
            {section.title}
          </button>
        ))}
        </nav>

        <main className="flex flex-col gap-10 w-[90%]">
        <section className='p-10 bg-gradient-to-br from-green-100 via-teal-100 to-sky-100 rounded-2xl'>
          <h2 className="text-2xl font-bold mb-7 text-gray-800 border-b-2 border-black pb-1 inline-block">{tipsSections[activeSection].title}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tipsSections[activeSection].tips.map((tip, index) => (
              <div key={index} className="bg-zinc-100 p-5 rounded-2xl shadow-lg border-l-4 border-gray-900 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold mb-3 text-slate-700">{tip.title}</h3>
                <p className="font-medium mb-4 text-black">{tip.description}</p>
                <div className="p-4 bg-gray-50 rounded-md border-l-3 border-slate-600">
                  <small className="text-black">{tip.details}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl mb-8 bg-gradient-to-br from-rose-100 to-rose-200 p-6">
          <h2 className="text-3xl font-bold mb-6 inline-block border-b-2 border-red-400 pb-1 text-red-600">Resume Red Flags 🚩</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {commonMistakes.map((mistake, index) => (
              <div key={index} className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <span className="text-xl">❌</span>
                {mistake}
              </div>
            ))}
          </div>
        </section>

         <section className="bg-gradient-to-br from-green-100 to-teal-100 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6 text-green-700 inline-block border-b-2 border-green-700">ATS Optimization Checklist ✅</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {quickChecklist.map((item, index) => (
                <label key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg cursor-pointer transition-colors duration-200 hover:bg-green-50">
                  <input type="checkbox" className="w-5 h-5 accent-green-500" />
                  {item}
                </label>
              ))}
            </div>
        </section>
         <section className="bg-gradient-to-br from-orange-100 to-pink-100 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-orange-800 border-b-2 inline-block pb-1">Pro Tips ⚡️</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white/90 p-5 rounded-lg border-l-4 border-orange-500">
              <h3 className="text-xl font-semibold mb-2 text-orange-700">Keyword Strategy</h3>
              <p className="text-gray-700">Read the job description multiple times and identify 10-15 key terms. Naturally incorporate these throughout your resume.</p>
            </div>
            <div className="bg-white/90 p-5 rounded-lg border-l-4 border-teal-500">
              <h3 className="text-xl font-semibold mb-2 text-teal-700">Testing Your Resume</h3>
              <p className="text-gray-700">Copy your resume text and paste it into a plain text editor. If it looks readable, it's likely ATS-friendly.</p>
            </div>
            <div className="bg-white/90 p-5 rounded-lg border-l-4 border-red-500">
              <h3 className="text-xl font-semibold mb-2 text-red-700">Customization is Key</h3>
              <p className="text-gray-700">Tailor your resume for each application. Generic resumes perform poorly in ATS systems.</p>
            </div>
          </div>
        </section>

        </main>
    </div>
    </>
  )
}

export default ATSResumeTip