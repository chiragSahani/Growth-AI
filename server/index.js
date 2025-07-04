import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Extensive headline templates categorized by business type
const headlineTemplates = {
  restaurant: [
    "Why {name} is {location}'s Hidden Culinary Gem in 2025",
    "{name}: The {location} Restaurant Everyone's Raving About",
    "5 Reasons Why {name} Dominates {location}'s Food Scene",
    "How {name} Became {location}'s Most Talked-About Dining Spot",
    "The Secret Behind {name}'s Success in {location}",
    "{name}: Revolutionizing {location}'s Restaurant Industry",
    "Why {location} Food Lovers Choose {name} Every Time",
    "The {name} Experience: Setting New Standards in {location}",
    "{name} Transforms {location}'s Dining Landscape in 2025",
    "From Local Favorite to {location} Legend: The {name} Story"
  ],
  retail: [
    "Why {name} is {location}'s Best Shopping Secret",
    "{name}: The {location} Store That's Changing Everything",
    "How {name} Became {location}'s Go-To Shopping Destination",
    "{name} Leads {location}'s Retail Revolution in 2025",
    "The {name} Difference: Why {location} Shoppers Love Us",
    "{name}: Your {location} Shopping Experience Redefined",
    "5 Ways {name} Outshines {location}'s Competition",
    "Why {name} is {location}'s Fastest-Growing Retailer",
    "{name} Sets New {location} Retail Standards",
    "The Success Formula Behind {name} in {location}"
  ],
  service: [
    "Why {name} is {location}'s Most Trusted Service Provider",
    "{name}: The {location} Company That Delivers Excellence",
    "How {name} Became {location}'s #1 Choice for Quality Service",
    "{name} Transforms {location}'s Service Industry Standards",
    "The {name} Promise: Unmatched Service in {location}",
    "{name}: Setting {location}'s Gold Standard Since 2025",
    "Why {location} Residents Trust {name} Above All Others",
    "{name} Leads {location}'s Service Excellence Movement",
    "The Innovation Behind {name}'s {location} Success",
    "{name}: Where {location} Finds Reliable Solutions"
  ],
  healthcare: [
    "Why {name} is {location}'s Most Trusted Healthcare Provider",
    "{name}: Transforming Healthcare in {location} Since 2025",
    "How {name} Became {location}'s Premier Medical Destination",
    "{name} Sets New Healthcare Standards in {location}",
    "The {name} Approach: Revolutionizing {location} Healthcare",
    "Why {location} Patients Choose {name} for Better Health",
    "{name}: Leading {location}'s Healthcare Innovation",
    "The Healing Touch of {name} in {location}",
    "{name} Brings World-Class Care to {location}",
    "How {name} is Changing Lives in {location}"
  ],
  fitness: [
    "Why {name} is {location}'s Ultimate Fitness Destination",
    "{name}: Where {location} Gets Fit and Stays Strong",
    "How {name} Became {location}'s Fitness Game-Changer",
    "{name} Leads {location}'s Wellness Revolution",
    "The {name} Method: Transforming {location} Bodies",
    "Why {location} Athletes Train at {name}",
    "{name}: Building Stronger Communities in {location}",
    "The Success Behind {name}'s {location} Fitness Empire",
    "{name} Redefines Fitness Standards in {location}",
    "How {name} Motivates {location} to Reach New Heights"
  ],
  beauty: [
    "Why {name} is {location}'s Beauty Transformation Expert",
    "{name}: Where {location} Discovers True Beauty",
    "How {name} Became {location}'s Premier Beauty Destination",
    "{name} Sets {location}'s Beauty Trends for 2025",
    "The {name} Touch: Enhancing {location}'s Natural Beauty",
    "Why {location} Trusts {name} for Beauty Excellence",
    "{name}: Revolutionizing Beauty Standards in {location}",
    "The Art of Beauty: {name}'s {location} Success Story",
    "{name} Brings Luxury Beauty Services to {location}",
    "How {name} Makes {location} More Beautiful Every Day"
  ],
  automotive: [
    "Why {name} is {location}'s Most Trusted Auto Expert",
    "{name}: Keeping {location} Moving Since 2025",
    "How {name} Became {location}'s Go-To Auto Service",
    "{name} Drives {location}'s Automotive Excellence",
    "The {name} Guarantee: Superior Auto Care in {location}",
    "Why {location} Drivers Choose {name} Every Time",
    "{name}: Setting {location}'s Auto Service Standards",
    "The Engine Behind {name}'s {location} Success",
    "{name} Powers {location}'s Transportation Needs",
    "How {name} Keeps {location} on the Road"
  ],
  education: [
    "Why {name} is {location}'s Premier Learning Institution",
    "{name}: Shaping {location}'s Future Leaders",
    "How {name} Became {location}'s Educational Excellence Hub",
    "{name} Transforms Education in {location}",
    "The {name} Method: Inspiring {location} Students",
    "Why {location} Parents Choose {name} for Their Children",
    "{name}: Building Brighter Futures in {location}",
    "The Innovation Behind {name}'s {location} Success",
    "{name} Leads {location}'s Educational Revolution",
    "How {name} Empowers {location} Through Learning"
  ],
  technology: [
    "Why {name} is {location}'s Tech Innovation Leader",
    "{name}: Powering {location}'s Digital Future",
    "How {name} Became {location}'s Tech Solution Expert",
    "{name} Drives {location}'s Technology Revolution",
    "The {name} Edge: Advanced Tech Solutions in {location}",
    "Why {location} Businesses Trust {name} for Tech",
    "{name}: Connecting {location} to Tomorrow",
    "The Digital Transformation by {name} in {location}",
    "{name} Brings Cutting-Edge Tech to {location}",
    "How {name} Simplifies Technology for {location}"
  ],
  general: [
    "Why {name} is {location}'s Best Kept Business Secret",
    "{name}: The {location} Company Everyone's Talking About",
    "How {name} Became {location}'s Success Story",
    "{name} Leads Innovation in {location}",
    "The {name} Difference: Excellence in {location}",
    "Why {location} Chooses {name} Above All Others",
    "{name}: Setting New Standards in {location}",
    "The Success Behind {name}'s {location} Growth",
    "{name} Transforms Business in {location}",
    "How {name} Became {location}'s Trusted Partner"
  ]
};

// Business type detection keywords
const businessTypeKeywords = {
  restaurant: ['restaurant', 'cafe', 'bistro', 'diner', 'eatery', 'kitchen', 'grill', 'bar', 'pub', 'food', 'pizza', 'burger', 'sushi', 'bakery', 'coffee'],
  retail: ['store', 'shop', 'boutique', 'market', 'mall', 'outlet', 'fashion', 'clothing', 'shoes', 'electronics', 'books', 'toys', 'jewelry', 'furniture'],
  service: ['service', 'repair', 'maintenance', 'cleaning', 'plumbing', 'electrical', 'construction', 'landscaping', 'consulting', 'agency', 'firm'],
  healthcare: ['clinic', 'hospital', 'medical', 'dental', 'pharmacy', 'therapy', 'wellness', 'health', 'doctor', 'dentist', 'physiotherapy'],
  fitness: ['gym', 'fitness', 'yoga', 'pilates', 'crossfit', 'martial arts', 'dance', 'sports', 'training', 'wellness center'],
  beauty: ['salon', 'spa', 'beauty', 'hair', 'nails', 'massage', 'skincare', 'cosmetics', 'barber', 'aesthetics'],
  automotive: ['auto', 'car', 'garage', 'mechanic', 'dealership', 'tire', 'oil change', 'automotive', 'vehicle', 'motorcycle'],
  education: ['school', 'academy', 'institute', 'college', 'university', 'tutoring', 'learning', 'education', 'training center'],
  technology: ['tech', 'software', 'IT', 'computer', 'digital', 'web', 'app', 'development', 'programming', 'systems']
};

// Enhanced business insights data
const businessInsights = {
  restaurant: {
    avgRating: { min: 4.0, max: 4.8 },
    reviewRange: { min: 80, max: 800 },
    insights: [
      "Peak dining hours: 7-9 PM weekdays",
      "Most popular: Weekend brunch menu",
      "Top review keywords: 'fresh', 'authentic', 'cozy'",
      "Seasonal menu changes boost engagement",
      "Local ingredient sourcing appreciated"
    ]
  },
  retail: {
    avgRating: { min: 3.8, max: 4.6 },
    reviewRange: { min: 50, max: 600 },
    insights: [
      "Peak shopping: Weekend afternoons",
      "High customer return rate: 68%",
      "Top categories: Seasonal collections",
      "Online presence drives foot traffic",
      "Customer service highly rated"
    ]
  },
  service: {
    avgRating: { min: 4.2, max: 4.9 },
    reviewRange: { min: 30, max: 400 },
    insights: [
      "Response time: Under 2 hours",
      "Customer satisfaction: 94%",
      "Repeat business rate: 78%",
      "Emergency services available",
      "Licensed and insured professionals"
    ]
  },
  healthcare: {
    avgRating: { min: 4.3, max: 4.9 },
    reviewRange: { min: 100, max: 1200 },
    insights: [
      "Average wait time: 15 minutes",
      "Patient satisfaction: 96%",
      "Same-day appointments available",
      "Comprehensive care approach",
      "Modern equipment and facilities"
    ]
  },
  fitness: {
    avgRating: { min: 4.1, max: 4.7 },
    reviewRange: { min: 60, max: 500 },
    insights: [
      "Peak hours: 6-8 AM, 6-8 PM",
      "Member retention rate: 82%",
      "Personal training popular",
      "Clean and well-maintained",
      "Supportive community atmosphere"
    ]
  },
  beauty: {
    avgRating: { min: 4.0, max: 4.8 },
    reviewRange: { min: 40, max: 350 },
    insights: [
      "Booking rate: 95% advance",
      "Client retention: 85%",
      "Trending services: Organic treatments",
      "Skilled and certified staff",
      "Relaxing atmosphere praised"
    ]
  },
  automotive: {
    avgRating: { min: 4.2, max: 4.8 },
    reviewRange: { min: 70, max: 450 },
    insights: [
      "Average service time: 2 hours",
      "Customer trust rating: 92%",
      "Warranty on all work",
      "Honest pricing appreciated",
      "Expert diagnostics available"
    ]
  },
  education: {
    avgRating: { min: 4.4, max: 4.9 },
    reviewRange: { min: 90, max: 600 },
    insights: [
      "Student success rate: 94%",
      "Small class sizes maintained",
      "Experienced instructors",
      "Flexible scheduling options",
      "Strong community reputation"
    ]
  },
  technology: {
    avgRating: { min: 4.1, max: 4.7 },
    reviewRange: { min: 25, max: 300 },
    insights: [
      "Project completion: On-time 96%",
      "Client satisfaction: 91%",
      "24/7 support available",
      "Cutting-edge solutions",
      "Competitive pricing model"
    ]
  },
  general: {
    avgRating: { min: 3.9, max: 4.6 },
    reviewRange: { min: 40, max: 400 },
    insights: [
      "Customer satisfaction: 89%",
      "Reliable service delivery",
      "Competitive market position",
      "Strong local presence",
      "Positive community impact"
    ]
  }
};

// Location-specific modifiers
const locationModifiers = {
  metropolitan: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  suburban: ['Plano', 'Irvine', 'Fremont', 'Scottsdale', 'Gilbert', 'Chandler', 'Glendale', 'Norfolk', 'Chesapeake', 'Garland'],
  smallTown: ['Salem', 'Bend', 'Flagstaff', 'Missoula', 'Burlington', 'Asheville', 'Boulder', 'Santa Fe', 'Park City', 'Traverse City']
};

// Helper function to detect business type
const detectBusinessType = (name) => {
  const nameLower = name.toLowerCase();
  
  for (const [type, keywords] of Object.entries(businessTypeKeywords)) {
    if (keywords.some(keyword => nameLower.includes(keyword))) {
      return type;
    }
  }
  
  return 'general';
};

// Helper function to get location type
const getLocationType = (location) => {
  if (locationModifiers.metropolitan.some(city => location.toLowerCase().includes(city.toLowerCase()))) {
    return 'metropolitan';
  }
  if (locationModifiers.suburban.some(city => location.toLowerCase().includes(city.toLowerCase()))) {
    return 'suburban';
  }
  return 'smallTown';
};

// Enhanced rating generation based on business type and location
const generateRating = (businessType, locationType) => {
  const baseRange = businessInsights[businessType].avgRating;
  let modifier = 0;
  
  // Location-based modifiers
  switch (locationType) {
    case 'metropolitan':
      modifier = -0.1; // Slightly lower due to higher competition
      break;
    case 'suburban':
      modifier = 0.1; // Slightly higher due to community focus
      break;
    case 'smallTown':
      modifier = 0.2; // Higher due to personal service
      break;
  }
  
  const min = Math.max(3.0, baseRange.min + modifier);
  const max = Math.min(5.0, baseRange.max + modifier);
  
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

// Enhanced review count generation
const generateReviewCount = (businessType, locationType) => {
  const baseRange = businessInsights[businessType].reviewRange;
  let modifier = 1;
  
  // Location-based modifiers
  switch (locationType) {
    case 'metropolitan':
      modifier = 1.5; // More reviews in big cities
      break;
    case 'suburban':
      modifier = 1.0; // Standard
      break;
    case 'smallTown':
      modifier = 0.6; // Fewer reviews in small towns
      break;
  }
  
  const min = Math.floor(baseRange.min * modifier);
  const max = Math.floor(baseRange.max * modifier);
  
  return Math.floor(Math.random() * (max - min) + min);
};

// Enhanced headline generation
const generateHeadline = (name, location, businessType) => {
  const templates = headlineTemplates[businessType] || headlineTemplates.general;
  const template = templates[Math.floor(Math.random() * templates.length)];
  return template.replace('{name}', name).replace('{location}', location);
};

// Generate business insights
const generateInsights = (businessType) => {
  const insights = businessInsights[businessType].insights;
  const selectedInsights = [];
  const numInsights = Math.floor(Math.random() * 3) + 2; // 2-4 insights
  
  while (selectedInsights.length < numInsights && selectedInsights.length < insights.length) {
    const insight = insights[Math.floor(Math.random() * insights.length)];
    if (!selectedInsights.includes(insight)) {
      selectedInsights.push(insight);
    }
  }
  
  return selectedInsights;
};

// Generate competitor analysis
const generateCompetitorData = (businessType, location) => {
  const competitorCount = Math.floor(Math.random() * 8) + 3; // 3-10 competitors
  const marketShare = Math.floor(Math.random() * 25) + 10; // 10-35% market share
  
  return {
    localCompetitors: competitorCount,
    estimatedMarketShare: `${marketShare}%`,
    competitiveAdvantage: businessType === 'service' ? 'Response Time' : 
                         businessType === 'restaurant' ? 'Menu Variety' :
                         businessType === 'retail' ? 'Product Selection' : 'Customer Service'
  };
};

// Generate SEO metrics
const generateSEOMetrics = (name, location) => {
  return {
    localSearchRanking: Math.floor(Math.random() * 5) + 1, // 1-5 position
    monthlySearchVolume: Math.floor(Math.random() * 2000) + 500, // 500-2500 searches
    keywordOpportunities: Math.floor(Math.random() * 15) + 5, // 5-20 opportunities
    onlineVisibility: `${Math.floor(Math.random() * 30) + 60}%` // 60-90% visibility
  };
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
    const businessType = detectBusinessType(name);
    const locationType = getLocationType(location);
    
    const businessData = {
      // Basic metrics
      rating: generateRating(businessType, locationType),
      reviews: generateReviewCount(businessType, locationType),
      headline: generateHeadline(name, location, businessType),
      
      // Enhanced data
      businessType: businessType,
      locationType: locationType,
      insights: generateInsights(businessType),
      competitorAnalysis: generateCompetitorData(businessType, location),
      seoMetrics: generateSEOMetrics(name, location),
      
      // Metadata
      lastUpdated: new Date().toISOString(),
      dataFreshness: 'Real-time simulation',
      confidenceScore: Math.floor(Math.random() * 20) + 80 // 80-100% confidence
    };
    
    res.json(businessData);
  }, Math.floor(Math.random() * 1500) + 1000); // 1-2.5 second delay
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
    const businessType = detectBusinessType(name);
    const newHeadline = generateHeadline(name, location, businessType);
    
    res.json({
      headline: newHeadline,
      businessType: businessType,
      regeneratedAt: new Date().toISOString(),
      alternativeHeadlines: [
        generateHeadline(name, location, businessType),
        generateHeadline(name, location, businessType),
        generateHeadline(name, location, businessType)
      ].filter(h => h !== newHeadline).slice(0, 2)
    });
  }, Math.floor(Math.random() * 1000) + 500); // 0.5-1.5 second delay
});

// GET /business-insights endpoint - New endpoint for additional insights
app.get('/business-insights', (req, res) => {
  const { name, location } = req.query;
  
  if (!name || !location) {
    return res.status(400).json({
      error: 'Business name and location are required'
    });
  }

  setTimeout(() => {
    const businessType = detectBusinessType(name);
    const locationType = getLocationType(location);
    
    const insights = {
      trendingKeywords: [
        `${name} ${location}`,
        `best ${businessType} ${location}`,
        `${location} ${businessType} reviews`,
        `top rated ${businessType} near me`,
        `${businessType} services ${location}`
      ],
      seasonalTrends: {
        peak: businessType === 'restaurant' ? 'December' : 
              businessType === 'retail' ? 'November' :
              businessType === 'fitness' ? 'January' : 'Spring',
        low: businessType === 'restaurant' ? 'February' :
             businessType === 'retail' ? 'February' :
             businessType === 'fitness' ? 'December' : 'Winter'
      },
      customerDemographics: {
        primaryAge: businessType === 'fitness' ? '25-40' :
                   businessType === 'beauty' ? '20-45' :
                   businessType === 'healthcare' ? '30-65' : '25-55',
        genderSplit: businessType === 'beauty' ? '80% Female' :
                    businessType === 'automotive' ? '70% Male' : '50/50 Split',
        incomeLevel: locationType === 'metropolitan' ? 'Upper-Middle' :
                    locationType === 'suburban' ? 'Middle' : 'Middle-Lower'
      },
      recommendedActions: [
        'Optimize Google Business Profile',
        'Encourage customer reviews',
        'Update business hours regularly',
        'Add high-quality photos',
        'Respond to customer inquiries promptly'
      ]
    };
    
    res.json(insights);
  }, 800);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    features: ['Enhanced Business Data', 'Smart Type Detection', 'Location Analysis', 'SEO Insights']
  });
});

// GET /business-types endpoint - List all supported business types
app.get('/business-types', (req, res) => {
  res.json({
    supportedTypes: Object.keys(businessTypeKeywords),
    totalTemplates: Object.values(headlineTemplates).reduce((sum, templates) => sum + templates.length, 0),
    detectionKeywords: businessTypeKeywords
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Enhanced GrowthProAI Backend running on http://localhost:${PORT}`);
  console.log(`📊 Features: Smart Business Detection, Location Analysis, SEO Insights`);
  console.log(`🎯 Business Types: ${Object.keys(businessTypeKeywords).length} categories supported`);
  console.log(`📝 Headlines: ${Object.values(headlineTemplates).reduce((sum, templates) => sum + templates.length, 0)} unique templates`);
});