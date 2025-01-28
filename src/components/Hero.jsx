import React from "react";
import { styles } from "../styles";
import { EarthCanvas, StarsCanvas } from "./canvas";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-x-hidden">
      {/* Background starfield */}
      <StarsCanvas />

      {/* Container: stacks on mobile, row on md+ */}
      <div className="
        ${styles.paddingX}
        max-w-7xl mx-auto 
        px-4 py-20 
        flex flex-col md:flex-row 
        items-start gap-5
      ">
        {/* Left side: Text */}
        <div className="md:w-1/2">
          {/* The little line & dot on the left */}
          <div className="flex flex-row items-start mb-5">
            <div className="mr-3 flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
              <div className="w-1 h-40 violet-gradient" />
            </div>
            <div>
              <h1 className={`${styles.heroHeadText} text-white`}>
                Hi, I'm <span className="text-[#915EFF]">Ketan</span>
              </h1>
              <h2 className={`${styles.heroSubText} mt-2 text-white-100`}>
                I do{" "}
                <Typewriter
                  options={{
                    strings: ["Web Development","Data Analytics","AI & ML"],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h2>
            </div>
          </div>
        </div>

        {/* Right side: The Earth model */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[650px]">
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default Hero;
