// src/components/Projects.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";

import useMediaQuery from "../hooks/useMediaQuery"; // Make sure this hook exists
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import SetsSection from "./Sets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// A reusable card that optionally uses Tilt (desktop) or plain div (mobile).
const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  page_link,
  tiltEnabled = true, // We'll pass in "false" on mobile
  fadeInVariant = null, // We'll pass in fadeIn details on desktop only
}) => {
  const cardContent = (
    <>
      {/* Image Container */}
      <div className="relative w-full xs:h-[190px] sm:h-[250px]">
        <img src={image} alt={name} className="w-full h-full object-cover rounded-2xl" />

        {/* Source/Live Icons */}
        <div className="absolute inset-0 flex justify-end m-3 gap-2">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
              alt="source code"
              className="w-3 h-3 sm:w-5 sm:h-5 object-contain"
            />
          </div>
          <div
            onClick={() => window.open(page_link, "_blank")}
            className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
              alt="live site"
              className="w-3 h-3 sm:w-5 sm:h-5 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Title / Description */}
      <div className="mt-4">
        <h3 className="text-white font-bold xs:text-[15px] sm:text-[20px]">
          {name}
        </h3>
        {/* Hide description below sm */}
        <p className="hidden sm:block mt-2 text-secondary sm:text-[14px]">
          {description}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-2 sm:mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`xs:text-[10px] sm:text-[12px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </>
  );

  // If tilt is disabled, just wrap in a normal div.
  if (!tiltEnabled) {
    return (
      <div className="bg-tertiary p-2 sm:p-4 rounded-2xl xs:w-[249px] sm:w-[360px]">
        {cardContent}
      </div>
    );
  }

  // Otherwise, wrap in Tilt
  return (
    <Tilt
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-tertiary p-2 sm:p-4 rounded-2xl xs:w-[249px] sm:w-[360px] xs:h-[310px]"
    >
      {cardContent}
    </Tilt>
  );
};

// Desktop: Just a grid of ProjectCards
const DesktopGrid = () => {
  return (
    <motion.div
      // fade the entire grid in
      variants={fadeIn("", "", 0.1, 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="mt-10 w-full"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 justify-items-center">
        {projects.map((project, idx) => (
          <motion.div variants={fadeIn("up", "spring", idx * 0.15, 0.75)} key={project.name}>
            <ProjectCard
              {...project}
              tiltEnabled={true}       // Enable Tilt on desktop
              fadeInVariant={fadeIn}  // Optionally pass fadeIn
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Mobile carousel: Slides each project in/out with AnimatePresence
const MobileCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <div className="relative w-full h-[430px] mt-10 mb-8 flex items-center justify-center overflow-hidden">
      {/* Left Chevron */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-20 h-20 z-10">
        <motion.img
          src="https://img.icons8.com/?size=100&id=52511&format=png&color=ffffff"
          alt="prev"
          whileTap={{ scale: 0.9 }}     // We can keep this now
          onClick={handlePrev}
          className="w-full h-full black-gradient p-2 rounded-full cursor-pointer"
        />
      </div>

      {/* Animated Card */}
      <div className="relative w-[250px] h-[300px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <ProjectCard
              {...projects[currentIndex]}
              tiltEnabled={false} // Disable tilt on mobile
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Chevron */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 z-10">
        <motion.img
          src="https://img.icons8.com/?size=100&id=48345&format=png&color=ffffff"
          alt="next"
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className="w-full h-full black-gradient p-2 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

const Projects = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <>
      {/* Section header */}
      <motion.div variants={textVariant()} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="mt-3 text-secondary text-[16px] max-w-3xl leading-[30px] text-left">
          These projects highlight my expertise and technical skills, showcasing my
          work through concise descriptions and repository links.
        </p>
      </motion.div>

      {/* Show carousel or grid */}
      {isSmallScreen ? <MobileCarousel /> : <DesktopGrid />}

      {/* The sets section below */}
      <SetsSection />
    </>
  );
};

export default SectionWrapper(Projects, "projects");
