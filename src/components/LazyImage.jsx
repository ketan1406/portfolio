// src/components/LazyImage.jsx
import React, { useState } from "react";
import ImageLoader from "./ImageLoader"; // Your simple CSS spinner

const LazyImage = ({ src, alt, className = "", style = {}, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      // Ensure the wrapper fills the parent's width and height by default.
      style={{ position: "relative", width: "100%", height: "100%", ...style }}
    >
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageLoader />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        draggable="false"
        onLoad={() => setLoaded(true)}
        // Apply the passed className and force the image to fill the container.
        className={className}
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "block",
          width: "100%",
          height: "100%",
          // In case className does not include object-fit:
          objectFit: "cover",
        }}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
