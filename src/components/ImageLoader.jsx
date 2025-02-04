// src/components/ImageLoader.jsx
import React from "react";

const ImageLoader = () => {
  // This loader does not use any R3F hooks.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* A simple CSS spinner */}
      <div
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "50%",
          border: "4px solid #F1F1F1",
          borderTop: "4px solid transparent",
          animation: "loader-spin 1s linear infinite",
        }}
      />
      <p style={{ fontSize: 14, color: "#F1F1F1", fontWeight: 800, marginTop: 10 }}>
        Loading...
      </p>
    </div>
  );
};

export default ImageLoader;
