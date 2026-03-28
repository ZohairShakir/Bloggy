require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Mock Data (for persistence simulation)
let blogs = [
  {
    id: 1,
    title: 'AI in Healthcare: Revolutionizing the Future',
    excerpt: 'Explore how AI is transforming healthcare systems globally...',
    content: 'Artificial Intelligence (AI) is transforming healthcare by enabling faster diagnosis...',
    status: 'Published',
    seoScore: 82,
    readability: 90,
    aiDetection: 18,
    keywords: ['AI', 'Healthcare', 'Future Technology']
  }
];

let users = [];

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "User already exists with this email." });
  }
  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  res.status(201).json({ message: "Account created successfully.", user: { name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: "Login successful.", user: { name: user.name, email: user.email }, token: "mock-jwt-token" });
  } else {
    res.status(401).json({ error: "Invalid email or password." });
  }
});

// Routes
app.get('/api/blogs', (req, res) => {
  res.json(blogs);
});

app.post('/api/generate', async (req, res) => {
  const { keyword } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
    return res.status(500).json({ error: "Gemini API Key is missing. Please add it to your .env file." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `Write a professional, SEO-optimized blog post about "${keyword}". 
    The output must be a JSON object with the following fields:
    - title: A catchy SEO title.
    - excerpt: A short 2-sentence summary.
    - content: The full blog post content (at least 300 words).
    - keywords: An array of 5 relevant SEO keywords.
    - metrics: A JSON object containing scores (0-100) for:
        - seoScore: Overall SEO effectiveness.
        - keywordAccuracy: Accuracy of keyword placement.
        - contentDepth: Content depth vs competitor pages.
        - snippetEligibility: Featured snippet eligibility.
        - readability: Flesch-Kincaid style readability score.
        - aiDetection: Percentage of AI-sounding content (Lower is better).
        - geoOptimization: Readiness for local/GEO search.
        - ctaEffectiveness: How effective the call-to-actions are.
        - structuralStrength: Formatting and hierarchy strength.
        - platformAdaptation: Multi-platform adaptation quality.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const blogData = JSON.parse(jsonStr);

    // Flatten metrics into the blog object for easier frontend access if needed, 
    // but better to keep them in a sub-object as requested.
    const newBlog = {
      id: blogs.length + 1,
      ...blogData,
      status: 'Draft'
    };

    blogs.push(newBlog);
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ error: "Failed to generate blog with Gemini AI." });
  }
});

app.post('/api/audit', async (req, res) => {
  const { content } = req.body;

  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === '') {
    return res.json({
      metrics: {
        seoScore: 78,
        readability: 65,
        keywordAccuracy: 70,
        contentDepth: 60,
        snippetEligibility: 40,
        aiDetection: 20,
        geoOptimization: 50,
        ctaEffectiveness: 30,
        structuralStrength: 80,
        platformAdaptation: 45
      },
      issues: ['Missing meta description', 'Low keyword density'],
      suggestions: ['Add a compelling meta description', 'Include primary keyword in headings']
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Perform a deep SEO audit on the following blog content: "${content}". 
    Return a JSON object with:
    - metrics: A JSON object containing scores (0-100) for:
        - seoScore: Overall SEO effectiveness.
        - keywordAccuracy: Accuracy of keyword placement.
        - contentDepth: Content depth vs competitor pages.
        - snippetEligibility: Featured snippet eligibility.
        - readability: Flesch-Kincaid style readability score.
        - aiDetection: Percentage of AI-sounding content.
        - geoOptimization: Readiness for local/GEO search.
        - ctaEffectiveness: How effective the call-to-actions are.
        - structuralStrength: Formatting and hierarchy strength.
        - platformAdaptation: Multi-platform adaptation quality.
    - issues: An array of strings identifying SEO issues.
    - suggestions: An array of strings with actionable advice.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    res.json(JSON.parse(jsonStr));
  } catch (err) {
    console.error("Gemini Audit Error:", err);
    res.status(500).json({ error: "Failed to audit content with Gemini AI." });
  }
});

app.post('/api/distribute', async (req, res) => {
  const { blogId, platforms } = req.body;

  // Simulate distributed publishing to 5 platforms
  const status = platforms.map(p => ({
    platform: p,
    status: 'Success',
    timestamp: new Date().toISOString(),
    link: `https://${p.toLowerCase()}.com/p/bloggy-simulated-${blogId}`
  }));

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  res.json({
    message: "Distribution completed successfully.",
    results: status
  });
});

app.delete('/api/blogs/:id', (req, res) => {
  const { id } = req.params;
  const index = blogs.findIndex(b => b.id === parseInt(id));
  if (index !== -1) {
    blogs.splice(index, 1);
    res.json({ message: "Blog deleted successfully." });
  } else {
    res.status(404).json({ error: "Blog not found." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
