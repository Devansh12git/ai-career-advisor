// server.js
// ai-career-advisor backend server

// Node Exress server setup
import express from "express";
import fetch from "node-fetch";
//cors is used to enable Cross-Origin Resource Sharing (CORS) for the server.
// This allows the server to accept requests from different origins, which is useful for frontend-backend
import cors from "cors";
// multer is used for handling file uploads in the server.
// It allows the server to parse multipart/form-data, which is commonly used for file uploads.
import multer from "multer";
// pdfjs-dist is a library for parsing and rendering PDF files in JavaScript.
// It is used to extract text from PDF files uploaded by users.
import pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
const { getDocument } = pdfjsLib;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Variables for Cerebras API. It stores the API key, API URL, and model name.
const CEREBRAS_API_KEY = "csk-hf9m5hc5wxeeeyd2vrtrdx83hntn6nr5nwr3mm5n84f6k5ew";
const CEREBRAS_API_URL = "https://api.cerebras.ai/v1/chat/completions";
const CEREBRAS_MODEL = "llama-4-scout-17b-16e-instruct";

// ✅ Extract text from PDF buffer
async function extractTextFromPdf(buffer) {
  const loadingTask = getDocument({ data: new Uint8Array(buffer) });
  const pdf = await loadingTask.promise;

  let fullText = '';
  // If PDF contains multiple pages, we loop through each page to extract text.
  // and add the text to fullText.
  // This is useful for resumes that may have multiple pages.
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const strings = content.items.map(item => item.str).join(' ');
    fullText += strings + '\n';
  }

  return fullText;
}

// --- Skill Advice ---
// This endpoint provides career advice based on a skill input.
app.post("/api/skill-advice", async (req, res) => {
  const { skill } = req.body;

  try {
    // It calls the Cerebras AI API to get career advice based on the skill.
    // It makes Calls to AI API and pass the skill as input.
    // the response is then sent back to the client.
    const response = await fetch(CEREBRAS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CEREBRAS_API_KEY}`,
      },
      body: JSON.stringify({
        model: CEREBRAS_MODEL,
        messages: [
          {
            role: "user",
            content: `Suggest a career path for someone skilled in ${skill}`,
          },
        ],
      }),
    });

    // If the response is successful, it extracts the advice from the response.
    // If not, it returns an error message.
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No advice available.";
    res.json({ advice: reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// --- Resume Advice ---
// This endpoint provides career advice based on a resume file upload.
app.post("/api/resume-advice", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded." });
    }

    console.log("Resume uploaded:", req.file.originalname);

    // Extract text from the uploaded PDF resume file. 
    // It uses the extractTextFromPdf function to get the text content of the resume.
    // This is useful for analyzing the resume content.
    const resumeText = await extractTextFromPdf(req.file.buffer);

    console.log("Extracted resume text (first 300 chars):", resumeText.slice(0, 300));

    // It calls the Cerebras AI API to analyze the resume and suggest suitable career paths.
    // It sends the resume text to the AI API and gets a response with career suggestions.
    const response = await fetch(CEREBRAS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CEREBRAS_API_KEY}`,
      },
      // The resume text is sent as part of the message to the AI model.
      body: JSON.stringify({
        model: CEREBRAS_MODEL,
        messages: [
          {
            role: "user",
            content: `Analyze this resume and suggest suitable career paths:\n\n${resumeText}`,
          },
        ],
      }),
    });

    // If the response is successful, it extracts the advice from the response.
    // If not, it returns an error message.
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No suggestions available.";
    res.json({ advice: reply });
  } catch (error) {
    console.error("Error analyzing resume:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
