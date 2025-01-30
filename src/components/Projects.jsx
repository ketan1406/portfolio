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
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
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
  // Decide how many items per "slide"
  const isLg = useMediaQuery("(min-width: 1024px)"); // tailwind's 'lg'
  const isSm = useMediaQuery("(min-width: 640px)");  // tailwind's 'sm'

  let itemsPerSlide = 1;
  if (isLg) {
    itemsPerSlide = 6; // 6 => 2 rows x 3 columns
  } else if (isSm) {
    itemsPerSlide = 4; // 4 => 2 rows x 2 columns
  } else {
    itemsPerSlide = 1; // 1 => 1 row x 1 column
  }

  // Convert the projects array into smaller arrays
  const chunkedProjects = chunkArray(projects, itemsPerSlide);

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

  // 2-row layout if itemsPerSlide=6 => grid-cols-3 grid-rows-2
  // 2-row layout if itemsPerSlide=4 => grid-cols-2 grid-rows-2
  // 1 layout if itemsPerSlide=1 => just one
  let gridClasses = "flex justify-center items-center"; // fallback for 1
  if (itemsPerSlide === 6) {
    // 2 rows of 3
    gridClasses = "grid grid-cols-3 grid-rows-2 gap-x-2 gap-y-10 place-items-center";
  } else if (itemsPerSlide === 4) {
    // 2 rows of 2
    gridClasses = "grid grid-cols-2 grid-rows-2 gap-x-2 gap-y-10 place-items-center";
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto z-10"> 
      {/* Arrow: left */}
      <div className="absolute z-10 left-4 top-1/2 -translate-y-1/2">
        <motion.img
          src="https://img.icons8.com/?size=100&id=52511&format=png&color=ffffff"
          alt="prev"
          whileTap={{ scale: 0.8 }}
          onClick={handlePrev}
          className="w-20 h-20 black-gradient p-2 rounded-full cursor-pointer"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable="false"
        />
      </div>

      {/* Arrow: right */}
      <div className="absolute z-10 right-4 top-1/2 -translate-y-1/2">
        <motion.img
          src="https://img.icons8.com/?size=100&id=48345&format=png&color=ffffff"
          alt="next"
          whileTap={{ scale: 0.8 }}
          onClick={handleNext}
          className="w-20 h-20 black-gradient p-2 rounded-full cursor-pointer"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          draggable="false"
        />
      </div>

      {/* Slides container */}
      <div className="relative mt-10 overflow-hidden min-h-[550px] sm:min-h-[1100px]">
        <AnimatePresence initial={false} custom={direction}>
          {chunkedProjects.map((group, i) =>
            i === currentIndex ? (
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
            ) : null
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
