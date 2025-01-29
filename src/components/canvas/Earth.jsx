import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

// The Earth model (unchanged)
function EarthModel({ scale }) {
  const { scene } = useGLTF("./planet/scene.gltf", undefined, (loader) => {
    const dracoLoader = new DRACOLoader();
    loader.setDRACOLoader(dracoLoader);
  });

  return <primitive object={scene} scale={scale} position-y={0} rotation-y={0} />;
}

export default function EarthCanvas() {
  const controlsRef = useRef(null);

  // Camera/scale logic
  const [dimensions, setDimensions] = useState({
    fov: 45,
    position: [-4, 3, 6],
    scale: 3.0,
  });

  const updateDimensions = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setDimensions({ fov: 55, position: [-3, 2, 5], scale: 2.0 });
    } else if (width < 1024) {
      setDimensions({ fov: 50, position: [-4, 3, 6], scale: 2.5 });
    } else {
      setDimensions({ fov: 45, position: [-4, 3, 6], scale: 3.5 });
    }
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Disable manual rotation on mount
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = false; // only autoRotate
    }
  }, []);

  // When user taps the globe, enable manual rotation
  const handlePointerDownOnEarth = (e) => {
    e.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.enableRotate = true;
    }
  };

  // When user lifts finger or taps outside, disable manual rotation
  const handlePointerUpOrMissed = () => {
    if (controlsRef.current) {
      controlsRef.current.enableRotate = false;
    }
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
      // onPointerMissed triggers if user clicks empty space or lifts pointer outside mesh
      onPointerMissed={handlePointerUpOrMissed}
      // also listen for pointerup on the entire canvas
      onPointerUp={handlePointerUpOrMissed}
    >
      {/* OrbitControls with autoRotate always on. 
          We'll control "enableRotate" ourselves. */}
      <OrbitControls
        ref={controlsRef}
        autoRotate
        autoRotateSpeed={3.5}
        enableZoom={false}
        enablePan={false}
        // Note: We'll leave "enabled" alone, but keep manual rotation toggled via enableRotate
      />

      <Suspense fallback={<CanvasLoader />}>
        {/* The Earth mesh is clickable; pointerDown => allow user rotation */}
        <mesh onPointerDown={handlePointerDownOnEarth}>
          <EarthModel scale={dimensions.scale} />
        </mesh>
      </Suspense>
      <Preload all />
    </Canvas>
  );
}
