import React from "react";
import { IconContext } from "react-icons";
import { FiLoader } from "react-icons/fi";

import styled, { keyframes } from "styled-components";

const rotate = keyframes`
 0% {
     transform: rotate(0deg);
 }
 100% {
     transform: rotate(360deg)
 }
 `;

export const Loading = () => {
  return (
    <Icon>
      <IconContext.Provider value={{ size: "50px" }}>
        <FiLoader />
      </IconContext.Provider>
    </Icon>
  );
};

const Icon = styled.div`
  animation: ${rotate} 2s linear infinite;
  opacity: 0.5;
  width: 100%;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`;
