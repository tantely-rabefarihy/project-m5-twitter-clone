import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Tweet from "./Tweet/index";
import { FeedsDataContext } from "./Contexts/FeedsDataContext";

const HomeFeed = () => {
  const { sortedData, toggleLikeTweet } = useContext(FeedsDataContext);

  return (
    <Wrapper>
      <Home>Home</Home>
      <FeedsArea>
        {sortedData !== undefined
          ? sortedData?.map((singleTweet) => {
              console.log("IS IT LIKED: ", singleTweet.isLiked);
              return (
                <Tweet
                  key={singleTweet.id}
                  id={singleTweet.id}
                  authorData={singleTweet.author}
                  status={singleTweet.status}
                  time={singleTweet.timestamp}
                  isRetweeted={singleTweet.isRetweeted}
                  numRetweets={singleTweet.numRetweets}
                  retweetFrom={singleTweet.retweetFrom}
                  media={singleTweet.media}
                  isLiked={singleTweet.isLiked}
                  numLikes={singleTweet.numLikes}
                />
              );
            })
          : "LOADING..."}
      </FeedsArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 80%;
`;

const Home = styled.div`
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 2px solid rgb(230, 236, 240);
  height: 50px;
`;

const FeedsArea = styled.div`
  align-content: center;
`;

export default HomeFeed;
