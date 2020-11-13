import React, { useContext } from "react";
import styled from "styled-components";
import { FeedsDataContext } from "../Contexts/FeedsDataContext";
import { Stats } from "./Stats";
import Header from "./Header";
import ActionBar from "./ActionBar";
// import { TweetContext } from "../TweetContext";

const Tweet = ({
  status,
  time,
  numLikes,
  numRetweets,
  isLiked,
  isRetweeted,
  authorData,
  media,
}) => {
  //   console.log("MEDIA: ", media[0].url);

  const tweetMedia = media[0]?.url ?? "";
  return (
    <Wrapper>
      <Header authorData={authorData} time={time} />
      <TweetContents>{status}</TweetContents>
      {tweetMedia ? <MediaPost src={tweetMedia} /> : <></>}
      <Divider />
      <Divider />
      <ActionBar isLiked={isLiked} isRetweeted={isRetweeted} />
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  width: 580px;
  padding: 16px;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const TweetContents = styled.div`
  font-size: 16px;
  padding: 16px 0;
`;

const MediaPost = styled.img`
  border-radius: 10px;
  width: auto;
  height: 350px;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default Tweet;
