import React from "react";
const Footer = () => {
  return (
    <footer className="bg-[#2D2A55] text-white py-6">
      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6 mb-4">
        <a
          href="https://www.linkedin.com/in/ketan-saini-245861211/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src="https://img.icons8.com/?size=100&id=44019&format=png&color=000000" alt="LinkedIn" className="my-image-class w-8 h-8" onContextMenu={(e) => e.preventDefault()}  onDragStart={(e) => e.preventDefault()}  draggable="false"/>
        </a>
        <a
          href="https://github.com/ketan1406"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src="https://img.icons8.com/?size=100&id=52539&format=png&color=000000" alt="GitHub" className="my-image-class w-8 h-8" onContextMenu={(e) => e.preventDefault()}  onDragStart={(e) => e.preventDefault()}  draggable="false"/>
        </a>
        <a
          href="https://www.instagram.com/_ketan.saini_/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          <img src="https://img.icons8.com/?size=100&id=43625&format=png&color=000000" alt="Instagram" className="my-image-class w-8 h-8" onContextMenu={(e) => e.preventDefault()}  onDragStart={(e) => e.preventDefault()}  draggable="false" />
        </a>
        <a
          href="mailto:sainiketan99@gmail.com"
          className="hover:opacity-80"
        >
          <img src="https://img.icons8.com/?size=100&id=44829&format=png&color=000000" alt="Email" className="my-image-class w-8 h-8" onContextMenu={(e) => e.preventDefault()}  onDragStart={(e) => e.preventDefault()}  draggable="false"/>
        </a>
      </div>

      {/* Text Below Icons */}
      <div className="text-center text-sm">
        <p className="mb-1">
          Built with <span className="text-red-500">❤</span> and <span className="text-blue-400">{"</>"}</span>
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
