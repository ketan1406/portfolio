import React, { useState } from "react";
import { sets } from "../constants"; // Import sets
import CanvasLoader from "./Loader";

const SetsModal = ({ set, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20">
    <div className="relative modal-border bg-primary p-2 rounded-2xl max-w-4xl w-full">
      {/* Close Icon */}
      <img
        src="https://img.icons8.com/?size=100&id=110627&format=png&color=000000"
        alt="close"
        className="absolute top-4 right-4 w-6 h-6 cursor-pointer"
        onClick={onClose}
      />
      <h2 className="text-white text-2xl font-bold text-center">{set.title}</h2>
      <p className="text-secondary mt-2 text-center">{set.description}</p>

      {/* Project Cards */}
      <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-center">
        {set.projects.map((project, index) => (
          <div
            key={index}
            className="bg-tertiary p-2 rounded-lg relative flex flex-col items-center justify-center min-h-[180px] min-w-[200px]"
          >
            {/* Image Loader */}
            <React.Suspense fallback={<CanvasLoader />}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              ) : (
                <CanvasLoader />
              )}
            </React.Suspense>

            {/* Project Details */}
            <div className="absolute top-2 right-2 flex gap-2">
              <div
                onClick={() => window.open(project.source_code_link, "_blank")}
                className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=106567&format=png&color=ffffff"
                  alt="source code"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <div
                onClick={() => window.open(project.page_link, "_blank")}
                className="black-gradient w-8 h-8 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src="https://img.icons8.com/?size=100&id=83168&format=png&color=ffffff"
                  alt="live site"
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
            <h3 className="text-white font-bold mt-2 text-center">
              {project.name}
            </h3>
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
