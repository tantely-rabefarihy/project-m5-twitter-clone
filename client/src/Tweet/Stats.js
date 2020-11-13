import React from "react";
import styled from "styled-components";

export const Stats = ({ numRetweets, numLikes }) => {
  return (
    <StatsContainer>
      <Retweet>
        <Bold>{numRetweets}</Bold> Retweets
      </Retweet>
      <Like>
        <Bold>{numLikes}</Bold> Likes
      </Like>
    </StatsContainer>
  );
};

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
`;
const Bold = styled.span`
  font-weight: bold;
  color: black;
`;

const Retweet = styled.div`
  margin-right: 20px;
  color: rgb(101, 119, 134);
`;

const Like = styled.div`
  color: rgb(101, 119, 134);
`;
