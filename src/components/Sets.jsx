import React, { useState, useRef } from "react";
import ReactDOM from "react-dom"; 
import { sets } from "../constants";
import ClickOutside from "./ClickOutside";    // your existing click-outside component
import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const SetCard = ({ project }) => {
  return (
    <div className="set-card">
      <h2 className="set-card-title">{project.name}</h2>
      <img
        src={project.image}
        alt={project.name}
        style={{
          width: "auto",
          maxHeight: "70%",
          margin: "0.5rem auto",
          borderRadius: "8px",
        }}
      />
      <div className="hover-info">
        <p>{project.description}</p>
        <div className="flex gap-4">
          <div
            onClick={() => window.open(project.source_code_link, "_blank")}
            className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
              alt="source code"
              className="my-image-class w-6 h-6 object-contain"
            />
          </div>
          <div
            onClick={() => window.open(project.page_link, "_blank")}
            className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
              alt="live site"
              className="my-image-class w-6 h-6  object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function MobileSetCard({ project }) {
  return (
    // Added "relative" so the absolute-positioned icons have a reference
    <div className="relative bg-tertiary p-2 rounded-2xl w-[249px] h-auto flex flex-col items-start justify-center">
      {/* The icon buttons: absolute top-right */}
      <div className="absolute inset-0 flex justify-end m-2 gap-2">
        <div
          onClick={() => window.open(project.source_code_link, "_blank")}
          className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
        >
          <img
            src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
            alt="source code"
            className="my-image-class w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
        </div>
        <div
          onClick={() => window.open(project.page_link, "_blank")}
          className="black-gradient w-6 h-6 sm:w-8 sm:h-8 rounded-full flex justify-center items-center cursor-pointer"
        >
          <img
            src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
            alt="live site"
            className="my-image-class w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
        </div>
      </div>

      {/* Existing title and image */}
      <h2 className="text-white font-bold text-lg mb-1">{project.name}</h2>
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-[150px] object-cover rounded-md"
      />
    </div>
  );
}

export function SetsMobileCarousel({ setData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const length = setData.projects.length;

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + length) % length);
  };
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % length);
  };

  return (
    <div className="relative w-full h-[350px] flex items-center justify-center overflow-hidden">
      {/* Left Arrow */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-12 h-12 z-10">
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

      {/* Slides */}
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
            <MobileSetCard project={setData.projects[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Arrow */}
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-12 h-12 z-10">
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
    </div>
  );
}

const SetsCarousel = ({ setData, hideTitle = false }) => {
  const [active, setActive] = useState(0);
  const count = setData.projects.length;

  const handlePrev = () => {
    setActive((prev) => (prev <= 0 ? count - 1 : prev - 1));
  };

  const handleNext = () => {
    setActive((prev) => (prev >= count - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ textAlign: "center" }}>
      {/* Only show if hideTitle is false */}
      {!hideTitle && (
        <h1 style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}>
          {setData.title}
        </h1>
      )}

      <div className="sets-carousel">
        <div className="arrow-btn left" onClick={handlePrev}>
          <motion.img
            src="https://img.icons8.com/?size=100&id=52511&format=png&color=ffffff"
            alt="prev arrow"
            className="w-full h-full object-contain"
            draggable="false"
            whileTap={{ scale: 0.8 }}
            onContextMenu={(e) => e.preventDefault()}  // blocks right-click or long-press
            onDragStart={(e) => e.preventDefault()}    // blocks drag
          />
        </div>

        {setData.projects.map((project, i) => {
          const offset = active - i;
          return (
            <div
              key={project.name + i}
              className="card-container"
              style={{
                "--active": i === active ? 1 : 0,
                "--offset": offset / 3,
                "--direction": Math.sign(offset),
                "--abs-offset": Math.abs(offset) / 3,
                pointerEvents: active === i ? "auto" : "none",
                opacity: Math.abs(offset) >= 2 ? "0" : "1",
                display: Math.abs(offset) > 2 ? "none" : "block",
              }}
            >
              <SetCard project={project} />
            </div>
          );
        })}

        <div className="arrow-btn right" onClick={handleNext}>
          <motion.img
            src="https://img.icons8.com/?size=100&id=48345&format=png&color=ffffff"
            alt="next arrow"
            className="w-full h-full object-contain"
            draggable="false"
            whileTap={{ scale: 0.8 }}
            onContextMenu={(e) => e.preventDefault()}  // blocks right-click or long-press
            onDragStart={(e) => e.preventDefault()}    // blocks drag
          />
        </div>
      </div>
    </div>
  );
};

function OverlayCarousel({ setData, onClose }) {
  const overlayRef = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  const overlay = (
    <ClickOutside onClick={onClose} exceptionRef={overlayRef}>
      <div className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex justify-center items-center">
        <div
          ref={overlayRef}
          className="relative max-w-4xl w-full mx-4 p-4 bg-transparent"
        >
          {/* Make the title & X a bit smaller for mobile */}
          <div className="flex items-center justify-between mb-2">
            <h2
              className={`text-white font-bold ml-4 ${
                isSmallScreen ? "text-lg" : "text-xl ml-20"
              }`}
            >
              {setData.title}
            </h2>
            <motion.img
              src="https://img.icons8.com/?size=100&id=110627&format=png&color=ffffff"
              alt="Close"
              className={`cursor-pointer ${
                isSmallScreen ? "w-5 h-5 mr-4" : "w-6 h-6 mr-20"
              }`}
              onClick={onClose}
              whileTap={{ scale: 0.8 }}
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* If mobile => SetsMobileCarousel, else => normal 3D SetsCarousel */}
          {isSmallScreen ? (
            <SetsMobileCarousel setData={setData} />
          ) : (
            <SetsCarousel setData={setData} hideTitle />
          )}
        </div>
      </div>
    </ClickOutside>
  );

  return ReactDOM.createPortal(overlay, document.body);
}

export default function SetsSection() {
  const [selectedSet, setSelectedSet] = useState(null);

  return (
    <div className="mt-20">
      <p className="text-secondary mt-2">
        Explore my categorized collections of projects.
      </p>

      {/* Grid of sets */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-7">
        {sets.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedSet(item)} // Show the overlay with the clicked set
            className="bg-secondary p-5 rounded-lg cursor-pointer hover:bg-opacity-80"
          >
            <h3 className="text-white text-xl font-bold">{item.title}</h3>
            <p className="text-secondary mt-2">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Fullscreen Overlay for the Carousel, only if a set is selected */}
      {selectedSet && (
        <OverlayCarousel
          setData={selectedSet}
          onClose={() => setSelectedSet(null)}
        />
      )}
    </div>
  );
}
