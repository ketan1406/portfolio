// src/constants/index.js
export const navLinks = [
  {
    id: "about",
    title: "Overview",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];
// src/constants/index.js
export const services = [
  { title: "Web Development", icon: "https://your-cdn.com/Tech-Stack/WebDev.png" },
  { title: "AI & ML", icon: "https://your-cdn.com/Tech-Stack/AI_ML.png" },
  { title: "CyberSecurity", icon: "https://your-cdn.com/Tech-Stack/CyberSecurity.png" },
  // Add more services as needed
];

export const projects = [
  {
    name: "Stock Analysis Agent",
    description:
      "AI tool for financial data, stock insights, and news, using Python, Streamlit, YFinance, and DuckDuckGo APIs.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "GroqAI", color: "purple-text-gradient" },
      { name: "DuckDuckGoSearchAPI", color: "pink-text-gradient" },
      { name: "YFinanceAPI", color: "yellow-text-gradient" },
    ],
    image: "./projects/financial-agent.png",
    source_code_link: "https://github.com/ketan1406/financial-agent",
  },
  {
    name: "Product Ingredient Analyzer",
    description:
      "AI-powered tool to analyze product ingredients, provide health insights, and suggest healthier alternatives.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "Pillow", color: "purple-text-gradient" },
      { name: "TavilyAPI", color: "pink-text-gradient" },
      { name: "GeminiAI", color: "yellow-text-gradient" },
    ],
    image: "./projects/ingredients-analyzer.png",
    source_code_link: "https://github.com/ketan1406/ingredients-analyzer",
  },
];