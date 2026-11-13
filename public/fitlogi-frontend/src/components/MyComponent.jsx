import React, { useRef, useEffect } from "react";

const MyComponent = () => {
  const myRef = useRef(null);

  useEffect(() => {
    if (myRef.current) {
      console.log("Element mounted:", myRef.current);
      myRef.current.style.backgroundColor = "#e0f7fa";
    }
  }, []);

  return (
    <div
      ref={myRef}
      style={{
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
        fontSize: "20px",
        color: "#00796b",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      Hello, I'm using <code>useRef</code>!
    </div>
  );
};

export default MyComponent;
