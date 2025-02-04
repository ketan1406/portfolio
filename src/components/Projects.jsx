// src/components/Projects.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt } from "react-tilt";
import useMediaQuery from "../hooks/useMediaQuery";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import SetsSection from "./Sets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import chunkArray from "../utils/chunkArray";
import LazyImage from "./LazyImage";

// A reusable card
const ProjectCard = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  page_link,
  tiltEnabled = true,
}) => {
  const cardContent = (
    <>
      {/* Image Container */}
      <div className="relative w-full xs:h-[190px] sm:h-[250px]">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-[160px] object-cover rounded-md"
        />
        {/* Icon buttons top-right */}
        <div className="absolute inset-0 flex justify-end m-3 gap-2">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
              alt="source code"
              className="my-image-class w-4 h-4 sm:w-5 sm:h-5 object-contain"
            />
          </div>
          <div
            onClick={() => window.open(page_link, "_blank")}
            className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
              alt="live site"
              className="my-image-class w-4 h-4 sm:w-5 sm:h-5 object-contain"
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

  // If tilt is disabled, normal card
  if (!tiltEnabled) {
    return (
      <div className="bg-tertiary p-2 sm:p-4 rounded-2xl xs:w-[249px] sm:w-[360px]">
        {cardContent}
      </div>
    );
  }

  // Otherwise, tilt
  return (
    <Tilt
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-tertiary p-2 sm:p-4 rounded-2xl xs:w-[249px] sm:w-[360px] xs:h-[310px] sm:h-auto"
    >
      {cardContent}
    </Tilt>
  );
};

function ProjectsCarousel() {
  // Already have:
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isSm = useMediaQuery("(min-width: 640px)");

  // Add for XS:
  const isXs = useMediaQuery("(max-width: 639px)");

  let itemsPerSlide = 1;
  if (isLg) {
    itemsPerSlide = 6;
  } else if (isSm) {
    itemsPerSlide = 4;
  } else {
    itemsPerSlide = 1;
  }

  const chunkedProjects = chunkArray(projects, itemsPerSlide);

  // chunk logic...
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % chunkedProjects.length);
  };
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + chunkedProjects.length) % chunkedProjects.length);
  };
  const handleDotClick = (idx) => {
    if (idx !== currentIndex) {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    }
  };

  // *** This is the part that must exist before you map over gridClasses ***
  let gridClasses = "flex justify-center items-center";
  if (itemsPerSlide === 6) {
    gridClasses = "grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-10 place-items-center";
  } else if (itemsPerSlide === 4) {
    gridClasses = "grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-10 place-items-center";
  } 
  // for 1, we keep the fallback

  return (
    <div className="relative w-full max-w-7xl mx-auto z-10">
      {/* 
        1) If isXs => place arrows on left/right & hide dots
        2) Else => top bar with arrows + dots
      */}
      {isXs ? (
        <>
          {/* Arrows on left/right sides for XS */}
          <div className="arrow-btn absolute -left-2 top-1/2 -translate-y-1/2 z-10">
            <motion.img
              src="https://img.icons8.com/?size=100&id=52511&format=png&color=ffffff"
              alt="prev"
              whileTap={{ scale: 0.8 }}
              onClick={handlePrev}
              className="w-full h-full black-gradient p-2 rounded-full cursor-pointer"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              draggable="false"
            />
          </div>
          <div className="arrow-btn absolute -right-2 top-1/2 -translate-y-1/2 z-10">
            <motion.img
              src="https://img.icons8.com/?size=100&id=48345&format=png&color=ffffff"
              alt="next"
              whileTap={{ scale: 0.8 }}
              onClick={handleNext}
              className="w-full h-full black-gradient p-2 rounded-full cursor-pointer"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              draggable="false"
            />
          </div>
        </>
      ) : (
        <div className="absolute top-0 left-0 w-full flex items-center justify-center gap-6 z-10">
          {/* Left arrow */}
          <motion.img
            src="https://img.icons8.com/?size=100&id=52511&format=png&color=ffffff"
            alt="prev"
            whileTap={{ scale: 0.8 }}
            onClick={handlePrev}
            className="w-12 h-12 black-gradient p-2 rounded-full cursor-pointer"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable="false"
          />

          {/* Dots */}
          <div className="flex items-center gap-3">
            {chunkedProjects.map((_, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className="w-6 h-6 flex items-center justify-center cursor-pointer"
                >
                  {isActive ? (
                    <img
                      src="https://img.icons8.com/?size=100&id=N-aPJN6VfRBa&format=png&color=000000"
                      alt="active dot"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right arrow */}
          <motion.img
            src="https://img.icons8.com/?size=100&id=48345&format=png&color=ffffff"
            alt="next"
            whileTap={{ scale: 0.8 }}
            onClick={handleNext}
            className="w-12 h-12 black-gradient p-2 rounded-full cursor-pointer"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            draggable="false"
          />
        </div>
      )}

      {/* The slides container */}
      <div
        className={
          isXs
            ? "relative mt-10 overflow-hidden min-h-[450px]" 
            : "relative top-5 mt-10 overflow-hidden min-h-[450px] sm:min-h-[1100px]"
        }
      >
        <AnimatePresence initial={false} custom={direction}>
          {chunkedProjects.map((group, i) =>
            i === currentIndex && (
              <motion.div
                key={i}
                custom={direction}
                initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`absolute inset-0 ${gridClasses} py-6`}
              >
                {group.map((project) => (
                  <ProjectCard key={project.name} {...project} />
                ))}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const Projects = () => {
  return (
    <>
      {/* Heading */}
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>

      {/* Subtext */}
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

      {/* Carousel */}
      <ProjectsCarousel />

      {/* Sets section */}
      <SetsSection />
    </>
  );
};

export default SectionWrapper(Projects, "projects");
