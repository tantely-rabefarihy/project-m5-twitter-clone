import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Tweet from "./Tweet/index";
import { FeedsDataContext } from "./Contexts/FeedsDataContext";

const HomeFeed = () => {
  const { sortedData, orderedData, toggleLikeTweet } = useContext(
    FeedsDataContext
  );

  return (
    <Wrapper>
      <FeedsArea>
        {sortedData !== undefined
          ? sortedData?.map((singleTweet, index) => {
              //   console.log(singleTweet.author.handle);
              //   console.log("TOGGLE LIKE TWEET", toggleLikeTweet(singleTweet.id));
              return (
                <Tweet
                  key={index}
                  id={singleTweet.id}
                  authorData={singleTweet.author}
                  status={singleTweet.status}
                  time={singleTweet.timestamp}
                  //   isLiked={singleTweet.isLiked}
                  isRetweeted={singleTweet.isRetweeted}
                  //   numLikes={singleTweet.numLikes}
                  numRetweets={singleTweet.numRetweets}
                  retweetFrom={singleTweet.retweetFrom}
                  media={singleTweet.media}
                />
              );
            })
          : "LOADING..."}
      </FeedsArea>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
`;

const FeedsArea = styled.div`
  align-content: center;
`;

export default HomeFeed;
