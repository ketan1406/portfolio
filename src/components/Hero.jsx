import React from "react";
import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto">
      {/* This StarsCanvas is placed behind everything as a background */}
      <StarsCanvas />

      <div
        className={`absolute inset-0 top-[100px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 select-none`}
      >
        {/* Left side: The "Hi, I'm Ketan..." and typewriter */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-100 h-60 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Ketan</span>
          </h1>
          <div className={`${styles.heroSubText} mt-2 text-white-100`}>
            I do{" "}
            <Typewriter
              options={{
                strings: ["Web Development", "AI & ML"],
                autoStart: true,
                loop: true,
                loopCount: Infinity,
                deleteSpeed: "natural",
                pauseFor: 1000,
              }}
            />
          </div>
        </div>

        {/* Right side: The Earth model */}
        <div className="flex-1 h-full">
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
