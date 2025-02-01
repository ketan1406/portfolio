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
  {
    title: "Python",
    icon: "https://img.icons8.com/?size=100&id=uLDrtp8o8zTG&format=png&color=000000",
  },
  {
    title: "Java",
    icon: "https://img.icons8.com/?size=100&id=FRRACRKRsw2s&format=png&color=000000",
  },
  {
    title: "C",
    icon: "https://img.icons8.com/?size=100&id=shQTXiDQiQVR&format=png&color=000000",
  },
  {
    title: "HTML5",
    icon: "https://img.icons8.com/?size=100&id=CMVEhOBzk3Zp&format=png&color=000000",
  },
  {
    title: "CSS",
    icon: "https://img.icons8.com/?size=100&id=5cVdiiKKi0vX&format=png&color=000000",
  },
  {
    title: "Javascript",
    icon: "https://img.icons8.com/?size=100&id=V6HShIzw21x7&format=png&color=000000",
  },
  // Add more services as needed
];

export const projects = [
  {
    name: "Stock Analysis Agent",
    description:
      "AI tool for financial data, stock insights, and news, using Python, Streamlit and Phi-Data APIs.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "GroqAI", color: "orange-text-gradient" },
      { name: "DuckDuckGoSearchAPI", color: "pink-text-gradient" },
      { name: "YFinanceAPI", color: "violet-text-gradient" },
    ],
    image: "./projects/financial-agent.png",
    source_code_link: "https://github.com/ketan1406/financial-agent",
    page_link: "https://ketan1406-financial-agent.streamlit.app/",
  },
  {
    name: "Dwindle - DigiLibrary",
    description:
      "Dwindle is a Vue.js digital library with Supabase and Tailwind CSS, offering e-book management, user/admin dashboards, and responsive design.",
    tags: [
      { name: "Vue.js", color: "blue-text-gradient" },
      { name: "Supabase", color: "green-text-gradient" },
      { name: "Tailwind CSS", color: "pink-text-gradient" },
      { name: "JavaScript", color: "orange-text-gradient" },
    ],
    image: "./projects/dwindle.png",
    source_code_link: "https://github.com/ketan1406/dwindle-frontend",
    page_link: "https://dwindle.vercel.app/",
  },
  {
    name: "CS Tool",
    description:
      "A lightweight, fast, and customizable cryptography and text utility tool built with Tailwind CSS, Vite, and Vanilla JavaScript.",
    tags: [
      { name: "Tailwind CSS", color: "blue-text-gradient" },
      { name: "Vite", color: "green-text-gradient" },
      { name: "Vanilla JS", color: "orange-text-gradient" },
    ],
    image: "./projects/cs-tool.png",
    source_code_link: "https://github.com/ketan1406/cs-tool",
    page_link: "https://ketan1406.github.io/cs-tool/",
  },
  {
    name: "Ingredient Analyzer",
    description:
      "AI-powered tool to analyze product ingredients, provide health insights, and suggest healthier alternatives.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "Pillow", color: "violet-text-gradient" },
      { name: "TavilyAPI", color: "pink-text-gradient" },
      { name: "GeminiAI", color: "orange-text-gradient" },
    ],
    image: "./projects/ingredients-analyzer.png",
    source_code_link: "https://github.com/ketan1406/ingredients-analyzer",
    page_link:
      "https://ketan1406-ingredients-analyzer-app-7gwwcn.streamlit.app/",
  },
  {
    name: "Image Sketch Converter",
    description:
      "A Python-based web app that converts images into various sketch styles using Streamlit and OpenCV. Enjoy real-time previews with an emoji-enhanced interface!",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "OpenCV", color: "orange-text-gradient" },
      { name: "Streamlit", color: "green-text-gradient" },
      { name: "NumPy", color: "violet-text-gradient" },
      { name: "Pillow", color: "pink-text-gradient" },
    ],
    image: "./projects/img-converter.png",
    source_code_link: "https://github.com/ketan1406/image-sketch-converter",
    page_link: "https://ketan1406-image-sketch-converter.streamlit.app/",
  },
  {
    name: "Customer Care Agent",
    description:
      "AI-driven agent for automating customer support, capable of answering FAQs, managing orders, and providing product information. Built using Python, LangChain, and AstraDB.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "LangChain", color: "green-text-gradient" },
      { name: "AstraDB", color: "violet-text-gradient" },
      { name: "AI Automation", color: "pink-text-gradient" },
      { name: "Customer Support", color: "orange-text-gradient" },
    ],
    image: "./projects/customer-care-agent.png",
    source_code_link: "https://github.com/ketan1406/customer-care-agent",
    page_link: "https://customer-agent-ketan1406.streamlit.app/",
  },
  {
    name: "Rabbit Game",
    description:
      "Rabbit Game is a Python-based grid adventure where you control a rabbit, collect carrots, and navigate obstacles using the curses library for a dynamic terminal UI.",
    tags: [
      { name: "Python", color: "blue-text-gradient" },
      { name: "Game Development", color: "green-text-gradient" },
      { name: "Algorithms", color: "pink-text-gradient" },
      { name: "curses", color: "orange-text-gradient" },
    ],
    image: "./projects/rabbit-game.png",
    source_code_link: "https://github.com/ketan1406/Rabbit-Game",
    page_link: "https://github.com/ketan1406/Rabbit-Game",
  },
  {
    name: "PGAGI Analytics Dashboard",
    description:
      "A comprehensive web-based platform for managing and visualizing data related to stocks, news, weather, and user profiles, built with modern frontend and backend technologies.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "Tailwind CSS", color: "green-text-gradient" },
      { name: "RTK Query", color: "violet-text-gradient" },
      { name: "Redux Toolkit", color: "orange-text-gradient" },
      { name: "Vercel", color: "pink-text-gradient" },
    ],
    image: "./projects/pgagi-analytics-dashboard.png",
    source_code_link: "https://github.com/ketan1406/pgagi-analytics-dashboard",
    page_link: "https://pgagi-analytics-dashboard-taupe.vercel.app/",
  },
];

export const sets = [
  {
    title: "Three.js Animations",
    description: "Explore my collection of 3D animations built using Three.js.",
    projects: [
      {
        name: "Earth",
        description: "A simple rotating Earth animation with atmospheric glow.",
        tags: [{ name: "Three.js", color: "text-blue-500" }],
        image: "./projects/sets/threejs/earth.png",
        source_code_link: "https://github.com/ketan1406/threejs-earth",
        page_link: "https://ketan1406.github.io/threejs-earth/",
      },
      {
        name: "Tetrahedrons",
        description:
          "An physics-based animation showcasing dynamic tetrahedrons",
        tags: [{ name: "Three.js", color: "text-blue-500" }],
        image: "./projects/sets/threejs/physics-tetrahedron.png",
        source_code_link: "https://github.com/ketan1406/threejs-phy-animation",
        page_link: "https://ketan1406.github.io/threejs-phy-animation/",
      },
      {
        name: "Wormhole",
        description: "A wireframe wormhole simulation.",
        tags: [{ name: "Three.js", color: "text-blue-500" }],
        image: "./projects/sets/threejs/wormhole.png",
        source_code_link:
          "https://github.com/ketan1406/threejs-wireframe-wormhole",
        page_link: "https://ketan1406.github.io/threejs-wireframe-wormhole/",
      },
      {
        name: "Rocket Game",
        description: "A 3D rocket simulation game.",
        tags: [{ name: "Three.js", color: "text-blue-500" }],
        image: "./projects/sets/threejs/rocket-game.png",
        source_code_link: "https://github.com/ketan1406/threejs-rocket-game",
        page_link: "https://ketan1406.github.io/threejs-rocket-game/",
      },
    ],
  },
  {
    title: "Landing Pages",
    description:
      "A collection of responsive landing pages designed for various purposes.",
    projects: [
      {
        name: "Velvora",
        description: "A clothing brand landing page.",
        tags: [{ name: "HTML", color: "text-green-500" }],
        image: "./projects/sets/landing/velvora.png",
        source_code_link: "https://github.com/ketan1406/landing-velvora-ui",
        page_link: "https://ketan1406.github.io/landing-velvora-ui/",
      },
      {
        name: "NFTrove",
        description:
          "An NFT marketplace for discovering, trading, and collecting digital assets.",
        tags: [
          { name: "HTML", color: "text-blue-500" },
          { name: "CSS", color: "text-purple-500" },
        ],
        image: "./projects/sets/landing/nftrove.png",
        source_code_link: "https://github.com/ketan1406/landing-nftrove",
        page_link: "https://ketan1406.github.io/landing-nftrove/",
      },
      {
        name: "Beats",
        description:
          "A responsive page for Beats headphones featuring product highlights, specs, and purchasing options.",
        tags: [
          { name: "HTML", color: "text-red-500" },
          { name: "CSS", color: "text-blue-500" },
          { name: "JavaScript", color: "text-yellow-500" },
        ],
        image: "./projects/sets/landing/beats.png",
        source_code_link: "https://github.com/ketan1406/landing-beats",
        page_link: "https://ketan1406.github.io/landing-beats/",
      },
    ],
  },
];
