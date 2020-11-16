import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Tweet from "./Tweet/index";
import { FeedsDataContext } from "./Contexts/FeedsDataContext";
import Meow from "./Meow";
import { ErrorPage } from "./ErrorPage";
const HomeFeed = () => {
  const { sortedData, toggleLikeTweet, errorStatus } = useContext(
    FeedsDataContext
  );

  return (
    <Wrapper>
      {errorStatus ? (
        <ErrorPage />
      ) : (
        <>
          <Home>Home</Home>
          <Meow />
          <FeedsArea>
            {sortedData !== undefined
              ? sortedData?.map((singleTweet) => {
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
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Home = styled.div`
  font-size: 20px;
  font-weight: bolder;
  border-bottom: 2px solid rgb(230, 236, 240);
  height: 50px;
  width: 580px;
`;

const FeedsArea = styled.div`
  align-content: center;
`;

export default HomeFeed;
