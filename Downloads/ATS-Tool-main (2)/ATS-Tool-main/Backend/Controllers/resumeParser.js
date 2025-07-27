import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseResume = async (req, res) => {
  try {
    const file = req.file;
    const jobDescription = req.body.jobDescription || ""; // Get job description if provided

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Check if file exists
    if (!fs.existsSync(file.path)) {
      return res.status(400).json({ message: "Uploaded file not found" });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    let extractedText = "";

    // Parse based on file type
    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(dataBuffer);
      extractedText = parsed.text;
    } else if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: file.path });
      extractedText = data.value;
    } else {
      // Clean up unsupported file
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      return res.status(400).json({ message: "Unsupported file format" });
    }

    // Generate unique ID for this parsing session
    const sessionId = Date.now() + "-" + Math.round(Math.random() * 1e9);
    
    // Create parsed_content directory if it doesn't exist
    const parsedDir = "parsed_content/";
    if (!fs.existsSync(parsedDir)) {
      fs.mkdirSync(parsedDir, { recursive: true });
      console.log("📁 Created parsed_content directory");
    }

    // Save extracted text to file
    const resumeTextFile = path.join(parsedDir, `resume_${sessionId}.txt`);
    fs.writeFileSync(resumeTextFile, extractedText, 'utf8');

    // Save job description if provided
    let jobDescFile = null;
    if (jobDescription.trim()) {
      jobDescFile = path.join(parsedDir, `job_desc_${sessionId}.txt`);
      fs.writeFileSync(jobDescFile, jobDescription, 'utf8');
    }

    // Clean up original uploaded file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    console.log("✅ Resume parsed and saved successfully:");
    console.log("📄 Original file:", file.originalname);
    console.log("📝 Resume text file:", resumeTextFile);
    console.log("💼 Job description file:", jobDescFile || "Not provided");
    console.log("📊 Extracted text length:", extractedText.length);
    
    res.status(200).json({
      success: true,
      message: "Resume parsed successfully",
      sessionId: sessionId,
      fileName: file.originalname,
      textLength: extractedText.length,
      files: {
        resumeText: resumeTextFile,
        jobDescription: jobDescFile
      },
      // Still send preview text for frontend display
      textPreview: extractedText.slice(0, 500) + "...",
    });
  } catch (err) {
    console.error("❌ Parsing error:", err.message);
    
    // Clean up file on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error("Error cleaning up file:", unlinkErr.message);
      }
    }
    
    res.status(500).json({ 
      success: false,
      message: "Failed to parse resume", 
      error: err.message 
    });
  }
};
