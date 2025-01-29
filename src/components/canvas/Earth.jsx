import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

// EarthModel stays the same
function EarthModel({ scale }) {
  const { scene } = useGLTF("./planet/scene.gltf", undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    loader.setDRACOLoader(dracoLoader);
  });

  return <primitive object={scene} scale={scale} position-y={0} rotation-y={0} />;
}

const EarthCanvas = () => {
  const [dimensions, setDimensions] = useState({
    fov: 45,
    position: [-4, 3, 6],
    scale: 3.0,
  });

  // 1) Track whether orbit controls are enabled
  const [enableOrbit, setEnableOrbit] = useState(false);

  // Same logic for resizing
  const updateDimensions = () => {
    const width = window.innerWidth;

    if (width < 768) {
      setDimensions({ fov: 55, position: [-3, 2, 5], scale: 2.0 });
    } else if (width < 1024) {
      setDimensions({ fov: 50, position: [-4, 3, 6], scale: 2.5 });
    } else {
      setDimensions({ fov: 45, position: [-4, 3, 6], scale: 3.0 });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // 2) On pointer down **on** the Earth, enable orbit
  const handlePointerDownOnEarth = (e) => {
    e.stopPropagation(); // don’t let the event bubble up
    setEnableOrbit(true);
  };

  // 3) On pointer miss (user taps outside Earth or lifts finger), disable orbit
  //    so that the user can scroll freely again.
  const handlePointerMissed = () => {
    setEnableOrbit(false);
  };

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: dimensions.fov,
        near: 0.1,
        far: 200,
        position: dimensions.position,
      }}
      shadows
      // 4) onPointerMissed is a fiber prop that triggers if user clicks outside geometry
      onPointerMissed={handlePointerMissed}
    >
      {/* Orbit controls:
          - autoRotate keeps the Earth spinning
          - enableZoom false (as in your original code)
          - enabled uses our state (enableOrbit).
      */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={3.5}
        enableZoom={false}
        enablePan={false}
        enabled={enableOrbit}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        maxPolarAngle={2 * Math.PI}
        minPolarAngle={0}
      />

      <Suspense fallback={<CanvasLoader />}>
        <mesh onPointerDown={handlePointerDownOnEarth}>
          {/* The Earth model inside the mesh */}
          <EarthModel scale={dimensions.scale} />
        </mesh>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
