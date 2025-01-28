import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";
import ClickOutside from "./ClickOutside";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const menuRef = useRef(null);

  const toggleResume = () => {
    const resumeUrl = "https://drive.google.com/file/d/12OM_be0GFeTR-lkdYgqPUnqBX1SfJMF-/view?usp=sharing";
    window.open(resumeUrl);
  };

  useEffect(() => {
    if (toggle) {
      setActive("");
    }
  }, [toggle]);

  const renderNavLinks = (isSecondary) => (
    <ul className={`list-none ${isSecondary ? "flex sm:hidden flex-col" : "hidden sm:flex"} flex-row gap-6`}>
      {navLinks.map((link) => (
        <li
          key={link.id}
          className={`${active === link.title ? "text-white" : isSecondary ? "text-secondary" : "text-white"} hover:text-white text-[15px] font-medium cursor-pointer`}
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
      <li className={`${isSecondary ? "text-secondary" : "text-white"} hover:text-white text-[15px] font-medium cursor-pointer`}>
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
          <img src={"../../assets/me.png"} alt="logo" className="w-9 h-9 object-contain rounded-full" />
          <p className="text-white text-[20px] font-bold cursor-pointer flex">
            KETAN&nbsp;
            <span className="sm:block hidden">SAINI</span>
          </p>
        </Link>
        {renderNavLinks(false)}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? "https://img.icons8.com/?size=100&id=9fyHXdGhDX2Z&format=png&color=000000" : "https://img.icons8.com/?size=100&id=44024&format=png&color=000000"}
            alt="menu"
            className="w-8 h-8 object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
            ref={menuRef}
          />
          {toggle && (
            <ClickOutside onClick={() => setToggle(false)} exceptionRef={menuRef}>
              <div className="p-4 bg-tertiary absolute top-10 right-0 mx-2 my-2 min-w-[120px] z-10 rounded-xl shadow-lg">
                {renderNavLinks(true)}
              </div>
            </ClickOutside>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;