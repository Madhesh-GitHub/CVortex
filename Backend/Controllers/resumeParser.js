import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

export const parseResume = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const ext = path.extname(file.originalname).toLowerCase();

    let text = "";

    if (ext === ".pdf") {
      const dataBuffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(dataBuffer);
      text = parsed.text;
    } else if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: file.path });
      text = data.value;
    } else {
      return res.status(400).json({ message: "Unsupported file format" });
    }

    fs.unlinkSync(file.path); // remove after parse
    console.log("Resume parsed successfully:", file.originalname);
    console.log("Extracted text :", text);
    res.status(200).json({
      message: "Resume parsed successfully",
      fileName: file.originalname,
      text: text.slice(0, 3000),
    });
  } catch (err) {
    console.error("Parsing error:", err.message);
    res.status(500).json({ message: "Failed to parse resume", error: err.message });
  }
};
