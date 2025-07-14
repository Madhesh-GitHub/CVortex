import React, { useRef, useState } from "react";
import { COLORS } from "../styles/colors";
import "./Dashboard.css";

export default function UploadResume() {
  const fileInput = useRef();
  const [fileName, setFileName] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) setFileName(e.dataTransfer.files[0].name);
  };

  const handleBrowse = () => fileInput.current.click();

  const handleAnalyze = (e) => {
    e.preventDefault();
    alert(`Resume: ${fileName || "No file"}\nJob Description: ${jobDesc || "None"}`);
  };

  return (
    <section className="upload-section">
      <h2 style={{ color: COLORS.primary }}>Upload Your Resume</h2>
      <form className="upload-form" onSubmit={handleAnalyze}>
        <div
          className="upload-dropzone"
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          style={{ borderColor: COLORS.primary }}
        >
          <div>
            <span style={{ fontSize: 32, color: COLORS.primary }}>⬆️</span>
            <div style={{ color: COLORS.textMuted, margin: "8px 0" }}>
              Drag and drop your resume here
            </div>
            <div style={{ color: COLORS.textMuted, fontSize: 13 }}>
              Supported formats: PDF, DOCX
            </div>
            <div style={{ margin: "12px 0" }}>or</div>
            <button
              type="button"
              className="upload-browse"
              style={{ borderColor: COLORS.secondary, color: COLORS.secondary }}
              onClick={handleBrowse}
            >
              Browse Files
            </button>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              ref={fileInput}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            {fileName && <div className="upload-filename">{fileName}</div>}
          </div>
        </div>
        <textarea
          className="upload-jobdesc"
          placeholder="Paste the job description here..."
          value={jobDesc}
          onChange={e => setJobDesc(e.target.value)}
          style={{ borderColor: COLORS.primary, color: COLORS.textPrimary }}
        />
        <button
          type="submit"
          className="upload-analyze"
          style={{ background: COLORS.primary }}
        >
          Analyze Resume
        </button>
      </form>
    </section>
  );
}