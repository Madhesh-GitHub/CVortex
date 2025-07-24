import React from "react";
import "./ResumeTemplates.css";

const templates = [
  {
    //title: "Classic Professional",
    image: "/template1.jpg",
    pdf: "/template1.pdf",
    title: "ATS Friendly Technical Resume",
    descriptionBody: "A modern, clean resume template optimized for showcasing technical skills, projects, and professional experience in AI/ML, software, or engineering fields. The straightforward structure makes it easy for ATS software to parse your details. Dedicated sections highlight technical expertise and certifications."
  },
  {
    //title: "Modern Minimalist",
    image: "/template2.jpg",
    pdf: "/template2.pdf",
    title: "AustereCV",
    descriptionBody: "This one-page, single-column template provides a minimalist layout, maximizing space for essential information. Its simple design ensures ATS systems can accurately interpret your work history and credentials. Ideal for professionals who want a clutter-free presentation",
  },
  {
   // title: "Executive Elegance",
    image: "/template3.jpg",
    pdf: "/template3.pdf",
    title: "FAANGPath Simple Template",
    descriptionBody: "Created by mentors at FAANGPath, this template emphasizes clarity and logical sectioning for smooth ATS parsing. The design avoids graphics or columns, prioritizing clean text for recruiter and machine readability. Great for roles in top tech companies",
  },
  {
   // title: "Creative ATS",
    image: "/template4.jpg",
    pdf: "/template4.pdf",
    title: "Charles’s CV Template",
    descriptionBody:"Features a single-column format and straightforward section headers. Flexible for both US and European resume standards, this template is praised for easy customization and high compatibility with ATS software. A strong choice for international positions",
  },
  {
    //title: "Compact Graduate",
    image: "/template5.jpg",
    pdf: "/template5.pdf",
    title: "Jake’s Resume",
    descriptionBody: "Jake’s Resume offers a straightforward, no-nonsense layout with clearly defined sections for contact info, experience, and education. Its linear structure helps ensure every detail is read correctly by ATS systems. Perfect for first-time Overleaf users",
  },
  {
    //title: "Technical Specialist",
    image: "/template6.jpg",
    pdf: "/template6.pdf",
    title: "ASU Resume Template",
    descriptionBody: "Embodying the preferred resume structure for Computer Science at Arizona State University, this template is both professional and visually appealing. The clear, label-focused design makes it highly ATS-compatible for tech jobs",
  },
  {
    //title: "Functional Focus",
    image: "/template7.jpg",
    pdf: "/template7.pdf",
    title: "70+ ATS Rating Resume Template",
    descriptionBody: "Designed to maximize ATS scores, this template features easy-to-follow sections and minimal formatting quirks. Its focus on simplicity and standard fonts ensures your resume won’t be missed by an automated scan",
  },
  {
    //title: "Administrative Pro",
    image: "/template8.jpg",
    pdf: "/template8.pdf",
    title: "SWE Resume Template",
    descriptionBody: "Specifically made for software developers, this resume employs a subtle design with bold headers and single columns. Guarantees ATS compatibility for engineering and tech applicants",
  },
  {
    //title: "Sales Achiever",
    image: "/template9.jpg",
    pdf: "/template9.pdf",
    title: "Resume Template by Anubhav",
    descriptionBody: "With a clean, single-column layout and simple section headers, this template ensures that every detail is ATS-readable. Great option for both academic and industry-focused resumes",
  },
  {
    //title: "Education Expert",
    image: "/template10.jpg",
    pdf: "/template10.pdf",
    title: "Awesome CV",
    descriptionBody: "Structured for easy editing and clear differentiation between sections.Minimal use of color and graphics for improved ATS performance.Well-suited for both experienced professionals and graduates.",
  }
];

const handleDownload = (pdf, title) => {
  const link = document.createElement('a');
  link.href = pdf;
  link.download = `${title.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ResumeTemplates = () => (
  <div className="templates-container">
    <h1 align="center">ATS-Friendly Resume Templates</h1>
    {/* <p>Browse our collection of ATS-optimized resume templates. Click 'Download PDF' to get a ready-to-use version.</p> */}
    <div className="templates-grid">
      {templates.map((tpl, idx) => (
        <div className="template-card" key={idx}>
          <div className="template-card-content">
            <img src={tpl.image} alt={tpl.title} className="template-image" />
            <h2>{tpl.title}</h2>
            <h3 className="template-desc-heading">{tpl.descriptionHeading}</h3>
            <p>{tpl.descriptionBody}</p>
          </div>
          <button className="download-btn" onClick={() => handleDownload(tpl.pdf, tpl.title)}>
            Download PDF
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default ResumeTemplates; 