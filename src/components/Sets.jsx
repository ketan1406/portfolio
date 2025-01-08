import React, { useState } from "react";
import { sets } from "../constants"; // Import sets

const SetsModal = ({ set, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
    <div className="relative bg-primary p-8 rounded-xl max-w-4xl w-full">
      {/* Close Icon */}
      <img
        src="https://img.icons8.com/?size=100&id=110627&format=png&color=000000"
        alt="close"
        className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-white text-2xl font-bold">{set.title}</h2>
      <p className="text-secondary mt-2">{set.description}</p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {set.projects.map((project, index) => (
          <div
            key={index}
            className="bg-tertiary p-1 rounded-lg cursor-pointer relative" // Added 'relative'
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-32 object-cover rounded-md"
            />
            <div className="absolute top-0.5 right-0.5 flex justify-end gap-0 card-img_hover"> {/* Adjusted classes */}
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer" // Adjusted size
              >
                <img
                  src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
                  alt="source code"
                  className="w-6 h-6 object-contain" // Adjusted size
                />
              </div>
              <div
                onClick={() => window.open(project.page_link, "_blank")}
                className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer" // Adjusted size
              >
                <img
                  src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
                  alt="live site"
                  className="w-6 h-6 object-contain" // Adjusted size
                />
              </div>
            </div>
            <h3 className="text-white font-bold mt-2">{project.name}</h3>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const SetsSection = () => {
  const [selectedSet, setSelectedSet] = useState(null);

  return (
    <div className="mt-20">
      <p className="text-secondary mt-2">
        Explore my categorized collections of projects.
      </p>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-7">
        {sets.map((set, index) => (
          <div
            key={index}
            onClick={() => setSelectedSet(set)}
            className="bg-secondary p-5 rounded-lg cursor-pointer hover:bg-opacity-80"
          >
            <h3 className="text-white text-xl font-bold">{set.title}</h3>
            <p className="text-secondary mt-2">{set.description}</p>
          </div>
        ))}
      </div>
      {selectedSet && (
        <SetsModal set={selectedSet} onClose={() => setSelectedSet(null)} />
      )}
    </div>
  );
};

export default SetsSection;
