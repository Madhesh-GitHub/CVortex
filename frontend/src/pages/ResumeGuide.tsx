import React from "react";

export default function ATSScoreChecker() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E0EAFF] text-gray-800 font-sans px-6 py-20 space-y-32">
      
      {/* 🚀 Title Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <h2 className="text-6xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
            Resume Guide
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn how ATS systems scan resumes and optimize your content to increase your chances of getting shortlisted.
        </p>
      </div>

      {/* 🧾 What is ATS */}
<section className="space-y-16 max-w-6xl mx-auto">
        <h3 className="text-center text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
    What is ATS?
  </h3>
  <div className="flex flex-col md:flex-row gap-10 items-center">
    <div className="flex-1 text-gray-700 text-lg leading-relaxed space-y-4">
      <p>
        An <strong>Applicant Tracking System (ATS)</strong> is software used by employers to manage and filter job applications. ATS helps streamline the hiring process by automatically sorting, ranking, and sometimes rejecting resumes based on specific criteria.
      </p>
      <p>
        These systems look for <strong>keywords</strong>, formatting, experience, and structure to determine if a resume is relevant. If your resume doesn't meet ATS requirements, it might never be seen by a human.
      </p>
    </div>
    <div className="flex-1 text-center">
      <img
        src="ATS2.webp"
        alt="ATS Illustration"
        className="w-64 mx-auto rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>


      {/* ⚙️ ATS Steps */}
      <section className="space-y-14">
        <h3 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
          How ATS Works?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { icon: "📄", text: "Upload Resume" },
            { icon: "🔍", text: "Scan for Keywords" },
            { icon: "📑", text: "Compare with JD" },
            { icon: "📊", text: "Get Score & Tips" },
          ].map((step, i) => (
            <div
              key={i}
              className="backdrop-blur-sm bg-white/70 border border-gray-200 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition duration-300"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <p className="font-medium text-md">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 Score Table */}
      <section className="space-y-12 max-w-5xl mx-auto">
        <h3 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
          ATS Score Meaning
        </h3>
        <div className="overflow-x-auto rounded-3xl shadow-xl bg-white border border-gray-200">
          <table className="w-full text-sm md:text-base text-left">
            <thead className="bg-gradient-to-r from-purple-100 to-blue-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-6 py-4 border">Score Range</th>
                <th className="px-6 py-4 border">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
  <tr className="transition hover:bg-green-300 hover:text-white">
    <td className="px-6 py-4 border font-medium">80–100 ✅</td>
    <td className="px-6 py-4 border">Excellent – Ready to go!</td>
  </tr>
  <tr className="transition hover:bg-yellow-300 hover:text-white">
    <td className="px-6 py-4 border font-medium">60–79 ⚠️</td>
    <td className="px-6 py-4 border">Average – Needs improvements</td>
  </tr>
  <tr className="transition hover:bg-red-300 hover:text-white">
    <td className="px-6 py-4 border font-medium">Below 60 ❌</td>
    <td className="px-6 py-4 border">Poor match – Not ATS-friendly</td>
  </tr>
</tbody>

          </table>
        </div>
      </section>

      {/* 🧠 ATS Checkpoints */}
      <section className="space-y-14 max-w-7xl mx-auto">
        <h3 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
          What We Check For
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: "🔑",
              title: "Keyword Match",
              desc: "Detects job-relevant keywords in your resume.",
            },
            {
              icon: "➕",
              title: "Formatting",
              desc: "Avoids tables, columns, and images that confuse ATS.",
            },
            {
              icon: "📁",
              title: "Sections",
              desc: "Checks for skills, education, experience, etc.",
            },
            {
              icon: "👁️",
              title: "Readability",
              desc: "Ensures clean structure with clear headings.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className="text-lg font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📚 ATS Deep Dive: Why & How */}
<section className="space-y-16 max-w-6xl mx-auto">
  <h3 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
    Why It’s Important?
  </h3>
  <p className="text-center max-w-3xl mx-auto text-gray-600 text-lg">
    Applicant Tracking Systems (ATS) are used by over 90% of companies to filter resumes before a human ever sees them. If your resume isn't ATS-friendly, it might get rejected before reaching the recruiter — even if you're qualified!
  </p>

  <div className="grid gap-8 md:grid-cols-2">
    {[
      {
        title: "🔑 The Importance of Keywords",
        desc: "ATS scans your resume for job-specific keywords. Without them, your resume might be skipped, even if you're a perfect fit."
      },
      {
        title: "🕵️‍♀️ How to Find Keywords",
        desc: "Check the job description, industry-standard terms, and required skills. Identify repeated phrases and role-specific terminology."
      },
      {
        title: "🧬 Naturally Integrate Keywords",
        desc: "Don’t keyword stuff. Blend keywords into bullet points, accomplishments, and section headers to make it natural and readable."
      },
      {
        title: "📐 Formatting for ATS",
        desc: "Use a simple, clean layout. Avoid columns, tables, text boxes, images, and headers/footers that ATS can’t read."
      },
      {
        title: "📁 Sections to Include",
        desc: "Your resume must have clear sections like Summary, Skills, Work Experience, Education, and Certifications."
      },
      {
        title: "⚡ Action Verbs",
        desc: "Use powerful verbs like 'Led', 'Built', 'Developed', 'Improved', 'Managed' to make your achievements pop and stand out to ATS."
      },
      {
        title: "❌ Common ATS Mistakes",
        desc: "Avoid fancy templates, using images, inconsistent fonts, or generic resume titles like 'My Resume'."
      },
      {
        title: "🎯 Tailor Your Resume",
        desc: "Customize your resume for each job. Use the job description as a checklist to align your skills and experience."
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
      >
        <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
        <p className="text-sm text-gray-700">{item.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* 🎯 CTA Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-14">
        <button className="bg-gradient-to-r from-blue-500 to-sky-400 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-300">
          ⬆️ Check My ATS Score
        </button>
        <button className="bg-gradient-to-r from-purple-700 to-blue-500 hover:opacity-90 text-white font-semibold px-8 py-3 rounded-full shadow-xl transition-all duration-300">
          🚀 Build Resume From Scratch
        </button>
      </div>


    {/* 🌐 Footer */}
<footer className="bg-gradient-to-br from-sky-100 to-[#F9FAFB] text-gray-800 border-t border-gray-200 mt-24">
  <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 sm:grid-cols-2 md:grid-cols-3">
    
    {/* Branding */}
    <div className="space-y-4">
      <h4 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500">
        ATS Score Checker
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        Helping you pass Applicant Tracking Systems and land your dream job with confidence.
      </p>
    </div>

    {/* Navigation Links */}
    <div className="space-y-4">
      <h5 className="font-semibold text-lg">Quick Links</h5>
      <ul className="space-y-2 text-sm">
        {["Home", "Features", "How it Works", "Contact"].map((link, i) => (
          <li key={i}>
            <a href="#" className="hover:text-purple-600 transition duration-200">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>

    {/* Social Media */}
    <div className="space-y-4">
      <h5 className="font-semibold text-lg">Connect With Us</h5>
      <div className="flex space-x-4 text-xl text-purple-700">
        {/* Replace these with actual links or SVGs as needed */}
        <a href="#" aria-label="Facebook">
          <i className="fab fa-facebook hover:text-blue-700 transition" />
        </a>
        <a href="#" aria-label="Twitter">
          <i className="fab fa-twitter hover:text-sky-500 transition" />
        </a>
        <a href="#" aria-label="LinkedIn">
          <i className="fab fa-linkedin hover:text-blue-600 transition" />
        </a>
        <a href="#" aria-label="Instagram">
          <i className="fab fa-instagram hover:text-pink-500 transition" />
        </a>
      </div>
    </div>
  </div>

  {/* Copyright */}
  <div className="text-center text-sm text-gray-500 py-6 border-t border-gray-300">
    © {new Date().getFullYear()} ATS Score Checker. All rights reserved.
  </div>
</footer>
</div>
  );
}
