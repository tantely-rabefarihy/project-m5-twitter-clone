import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";

export const ScaleIn = ({ children }) => {
  const style = useSpring({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    transform: "scale(1)",
    from: {
      transform: "scale(0)",
    },
    config: {
      tension: 100,
      friction: 8,
    },
  });

  return <animated.div style={style}>{children}</animated.div>;
};
