// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  const toggleResume = () => {
    const resumeUrl = "https://drive.google.com/file/d/your_resume_id/view?usp=sharing";
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) {
      setActive("");
    }
  }, [toggle]);

  const renderNavLinks = (isSecondary) => (
    <ul className={`list-none ${isSecondary ? "flex sm:hidden" : "hidden sm:flex"} flex-row gap-6`}>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${active === link.title ? "text-white" : isSecondary ? "text-secondary" : "text-white"} hover:text-white text-[10px] font-medium cursor-pointer`}
          onClick={() => {
            setActive(link.title);
            if (isSecondary) {
              setToggle(false);
            }
          }}
        >
          <a href={`#${link.id}`}>{link.title}</a>
        </li>
      ))}
      <li className={`${isSecondary ? "text-secondary" : "text-white"} hover:text-white text-[10px] font-medium cursor-pointer`}>
        <button onClick={toggleResume}>Resume</button>
      </li>
    </ul>
  );

  return (
    <nav className={`${styles.paddingX} w-full flex items-center py-3 fixed top-0 z-20 bg-primary`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={"https://img.icons8.com/?size=100&id=23280&format=png&color=000000"} alt="logo" className="w-5 h-5 object-contain" />
          <p className="text-white text-[10px] font-bold cursor-pointer flex">
            KETAN&nbsp;
            <span className="sm:block hidden">SAINI</span>
          </p>
        </Link>
        {renderNavLinks(false)}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? "https://your-cdn.com/path-to-close-icon.svg" : "https://your-cdn.com/path-to-menu-icon.svg"}
            alt="menu"
            className="w-[14px] h-[9px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />
          <div className={`p-4 black-gradient absolute top-14 right-0 mx-2 my-2 min-w-[120px] z-10 rounded-xl foggy-glass ${toggle ? "flex" : "hidden"}`}>
            {renderNavLinks(true)}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
