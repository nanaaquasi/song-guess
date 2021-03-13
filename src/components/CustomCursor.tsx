import React, { useEffect, useState } from "react";
import { Cursor } from "../styled/Shared";

type MousePosition = {
  x: number;
  y: number;
};

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 400,
    y: 400,
  });

  const onMouseMove = (e: MouseEvent) => {
    const { pageX: x, pageY: y } = e;
    setMousePosition({
      x,
      y,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <Cursor
      style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px` }}
    />
  );
};

export default CustomCursor;
