import React from "react";

const UnderConstruction = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <h1>Oups! This App is temporary broken</h1>
      <p>Sorry guys, I am currently fixing it...</p>
      <div style={{ height: "50vh" }}>
        <img
          style={{ height: "100%" }}
          src="https://i.imgur.com/FOeYt4E.png"
          alt="broken"
        />
      </div>
    </div>
  );
};

export default UnderConstruction;
