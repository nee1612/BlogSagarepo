import React, { useEffect } from "react";

const MovingShapes = () => {
  const gridWidth = 10; // Define the grid width
  const gridHeight = 10; // Define the grid height
  const grid = Array.from({ length: gridWidth * gridHeight }, (_, i) => i); // Create a grid array

  useEffect(() => {
    const createShape = () => {
      if (grid.length === 0) return; // Stop if no more positions are available

      const randomIndex = Math.floor(Math.random() * grid.length);
      const positionIndex = grid.splice(randomIndex, 1)[0]; // Get a random position and remove it from the grid

      const row = Math.floor(positionIndex / gridWidth);
      const col = positionIndex % gridWidth;

      const shape = document.createElement("div");
      const shapeType = Math.floor(Math.random() * 3); // 0 for square, 1 for circle, 2 for triangle
      shape.className = "shape absolute";

      switch (shapeType) {
        case 0: // Square
          shape.className += " bg-[#e2e8f0] rounded-md z-0";
          break;
        case 1: // Circle
          shape.className += " bg-[#e2e8f0] rounded-full";
          break;
        case 2: // Triangle
          shape.className += " triangle";
          break;
        default:
          break;
      }

      shape.style.left = `${col * 10}vw`; // Set the left position based on the grid column
      shape.style.top = "100vh"; // Set the top position based on the grid row
      shape.style.animationDuration = `${Math.random() * 5 + 7}s`;

      document.body.appendChild(shape);

      shape.addEventListener("animationend", () => {
        shape.remove();
      });
    };

    const interval = setInterval(createShape, 10000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default MovingShapes;
