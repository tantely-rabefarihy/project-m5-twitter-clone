import React from "react";
import styled, { keyframes } from "styled-components";

export const PoppingCircle = ({ size, color }) => {
  return <Wrapper style={{ width: size, height: size, background: color }} />;
};

const circleScale = keyframes`
    from {
        transform: scale(0);
        
    }
    to {
        transform: scale(1);
        
    }

`;

const circleFade = keyframes`
    from {
    opacity: 1;
    }
    to {
    opacity: 0;
    }
`;

const Wrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  animation: ${circleScale} 500ms forwards,
    ${circleFade} 500ms forwards cubic-bezier(0.75, 0.14, 0.7, 0.48);
`;
