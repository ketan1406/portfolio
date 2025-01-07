// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import React from "react";
import {
  Hero,
  Navbar,
  About,
  Contact,
  Footer,
  Projects,
  ParticleBackground
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Projects />
        <div className="relative z-0">
          <ParticleBackground />
          <Contact />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
