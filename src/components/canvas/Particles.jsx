import React, { useEffect, useRef } from "react";
import "../../index.css"; // Ensure this contains your global styles

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  const neonColors = [
    "rgba(58, 134, 255, 0.8)",  // Neon Blue
    "rgba(177, 58, 255, 0.8)",  // Neon Purple
    "rgba(255, 51, 153, 0.8)",  // Neon Pink
    "rgba(0, 255, 170, 0.8)",   // Neon Green
  ];

  useEffect(() => {
    const NUM_PARTICLES = 1000;
    const PARTICLE_SIZE = 0.5; // View heights
    const SPEED = 20000; // Milliseconds
    let particles = [];

    const rand = (low, high) => Math.random() * (high - low) + low;

    const normal = ({ mean, dev }) => {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
      return z * dev + mean;
    };

    const createParticle = () => ({
      x: -2,
      y: -2,
      diameter: Math.max(0, normal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
      duration: normal({ mean: SPEED, dev: SPEED * 0.1 }),
      amplitude: normal({ mean: 16, dev: 2 }),
      offsetY: normal({ mean: 0, dev: 10 }),
      arc: Math.PI * 2,
      startTime: performance.now() - rand(0, SPEED),
      colour: `rgba(255, ${normal({ mean: 125, dev: 20 })}, 50, ${rand(0, 1)})`,
    });

    const moveParticle = (particle, time, canvas) => {
      const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
      return {
        ...particle,
        x: progress,
        y: Math.sin(progress * particle.arc) * particle.amplitude + particle.offsetY,
      };
    };

    const drawParticle = (particle, canvas, ctx) => {
      const vh = canvas.height / 100;
      ctx.fillStyle = particle.colour;
      ctx.beginPath();
      ctx.ellipse(
        particle.x * canvas.width,
        particle.y * vh + canvas.height / 2,
        particle.diameter * vh,
        particle.diameter * vh,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();
    };

    const draw = (time, canvas, ctx) => {
      particles.forEach((particle, index) => {
        particles[index] = moveParticle(particle, time, canvas);
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => drawParticle(particle, canvas, ctx));
      requestAnimationFrame((t) => draw(t, canvas, ctx));
    };

    const initializeCanvas = (canvas) => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext("2d");
      return ctx;
    };

    const startAnimation = () => {
      const canvas = canvasRef.current;
      const ctx = initializeCanvas(canvas);

      window.addEventListener("resize", () => {
        initializeCanvas(canvas);
      });

      for (let i = 0; i < NUM_PARTICLES; i++) {
        particles.push(createParticle());
      }

      requestAnimationFrame((time) => draw(time, canvas, ctx));
    };

    if (canvasRef.current) {
      startAnimation();
    }
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>;
};

export default ParticleBackground;
