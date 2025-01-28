import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import SetsSection from "./Sets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ name, description, tags, image, source_code_link, page_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring")}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-4 rounded-2xl w-full xs:w-[250px] sm:w-[360px]"
      >
        {/* Image Container */}
        <div className="relative w-full xs:h-[230px] sm:h-[250px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Links to Source Code and Live Page */}
          <div className="absolute inset-0 flex justify-end m-3 gap-2">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
                alt="source code"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            </div>
            <div
              onClick={() => window.open(page_link, "_blank")}
              className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
                alt="live site"
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="mt-4">
          <h3 className="text-white font-bold xs:text-[12px] sm:text-[20px]">{name}</h3>
          <p className="mt-2 text-secondary xs:text-[9px] sm:text-[14px]">{description}</p>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={tag.name} className={`xs:text-[7px] sm:text-[12px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <>
      {/* Section Header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
      </motion.div>

      {/* Section Description */}
      <div className="w-full">
        <motion.p
          variants={fadeIn("", "", 0.1)}
          className="mt-3 text-secondary text-[16px] max-w-3xl leading-[30px] text-left"
        >
          These projects highlight my expertise and technical skills, showcasing my work through concise descriptions and repository links.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="mt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0 justify-items-center">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} {...project} />
          ))}
        </div>
      </div>

      {/* Sets Section */}
      <SetsSection />
    </>
  );
};

export default SectionWrapper(Projects, "projects");