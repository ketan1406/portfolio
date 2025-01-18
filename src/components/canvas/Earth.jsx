import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import CanvasLoader from "../Loader";

const EarthModel = ({ scale }) => {
  const { scene } = useGLTF(
    "./planet/scene.gltf",
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      loader.setDRACOLoader(dracoLoader);
    }
  );

  return <primitive object={scene} scale={scale} position-y={0} rotation-y={0} />;
};

const EarthCanvas = () => {
  const [dimensions, setDimensions] = useState({
    fov: 45,
    position: [-4, 3, 6],
    scale: 3.0,
  });

  const updateDimensions = () => {
    const width = window.innerWidth;

    // Adjust camera settings and scale based on screen width
    if (width < 768) {
      setDimensions({
        fov: 55,
        position: [-3, 2, 5],
        scale: 1.5,
      });
    } else if (width < 1024) {
      setDimensions({
        fov: 50,
        position: [-4, 3, 6],
        scale: 2.5,
      });
    } else {
      setDimensions({
        fov: 45,
        position: [-4, 3, 6],
        scale: 3.0,
      });
    }
  };

  useEffect(() => {
    updateDimensions(); // Run on mount
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

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
    >
      <OrbitControls
        autoRotate
        autoRotateSpeed={3.5}
        enableZoom={false}
        enablePan={false}
        minAzimuthAngle={-Infinity}
        maxAzimuthAngle={Infinity}
        maxPolarAngle={2 * Math.PI}
        minPolarAngle={0}
      />
      <Suspense fallback={<CanvasLoader />}>
        <EarthModel scale={dimensions.scale} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
