import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Sample headlines for different business types
const headlineTemplates = [
  "Why {name} is {location}'s Best Kept Secret in 2025",
  "{name}: The {location} Business Everyone's Talking About",
  "5 Reasons Why {name} Dominates {location}'s Market",
  "How {name} Became {location}'s Go-To Choice",
  "The Success Story Behind {name} in {location}",
  "{name}: Revolutionizing Business in {location}",
  "Why {location} Locals Choose {name} Every Time",
  "The {name} Difference: Setting {location} Standards"
];

// Helper function to generate random rating
const generateRating = () => {
  return Math.round((Math.random() * 1.5 + 3.5) * 10) / 10;
};

// Helper function to generate random review count
const generateReviewCount = () => {
  return Math.floor(Math.random() * 500) + 50;
};

// Helper function to generate headline
const generateHeadline = (name, location) => {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template.replace('{name}', name).replace('{location}', location);
};

// POST /business-data endpoint
app.post('/business-data', (req, res) => {
  const { name, location } = req.body;
  
  // Basic validation
  if (!name || !location) {
    return res.status(400).json({
      error: 'Business name and location are required'
    });
  }

  // Simulate processing delay
  setTimeout(() => {
    const businessData = {
      rating: generateRating(),
      reviews: generateReviewCount(),
      headline: generateHeadline(name, location),
      lastUpdated: new Date().toISOString()
    };
    
    res.json(businessData);
  }, 1000);
});

// GET /regenerate-headline endpoint
app.get('/regenerate-headline', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    return res.status(400).json({
      error: 'Business name and location are required'
    });
  }

  // Simulate processing delay
  setTimeout(() => {
    const newHeadline = generateHeadline(name, location);
    
    res.json({
      headline: newHeadline,
      regeneratedAt: new Date().toISOString()
    });
  }, 800);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});