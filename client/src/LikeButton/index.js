import React, { useContext } from "react";
import styled from "styled-components";
import { HandleToggleContext } from "../Contexts/HandleToggleContext";
import Heart from "./Heart";
import { PoppingCircle } from "./PoppingCircle";
import { ScaleIn } from "./ScaleIn";

const LikeButton = ({ size = 40 }) => {
  const { isLiked } = useContext(HandleToggleContext);

  const heartSize = size * 0.6;

  return (
    <Wrapper style={{ width: size, height: size }}>
      {isLiked ? (
        <ScaleIn>
          <Heart width={heartSize} isToggled={isLiked} />
        </ScaleIn>
      ) : (
        <Heart width={heartSize} isToggled={isLiked} />
      )}

      {isLiked && <PoppingCircle size={size} color="#E790F7" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LikeButton;
