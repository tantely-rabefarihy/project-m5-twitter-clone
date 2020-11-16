import React, { useContext } from "react";
import styled from "styled-components";
import { HandleToggleContext } from "../Contexts/HandleToggleContext";
import { FiHeart, FiShare } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import LikeButton from "../LikeButton";
import Action from "./Action";

const ActionBar = ({ id, isLiked, onLikeClick, numLikes }) => {
  return (
    <Wrapper>
      <Action color="black" size={20}>
        <FaRegComment style={{ width: "20px", height: "20px" }} />
      </Action>
      <Action color="rgb(23, 191, 99)" size={20}>
        <AiOutlineRetweet style={{ width: "20px", height: "20px" }} />
      </Action>
      {/* <div>{numOfRetweets}</div> */}
      <LikeCountainer>
        <Action
          onClick={() => onLikeClick({ isLiked, id })}
          color="rgb(224, 36, 94)"
          size={20}
          position="relative"
        >
          <FiHeart
            style={{
              width: "20px",
              height: "20px",
              fill: isLiked ? "red" : null,
            }}
          />
        </Action>
        <LikesCount>{numLikes}</LikesCount>
      </LikeCountainer>

      <Action color="rgb(27, 149, 224)" size={20}>
        <FiShare style={{ width: "20px", height: "20px" }} />
      </Action>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  width: 90%;
  position: relative;
`;

const LikeCountainer = styled.div`
  display: flex;
`;

const LikesCount = styled.span`
  align-self: center;
  font-size: 12px;
  margin-left: 5px;
`;
export default ActionBar;
