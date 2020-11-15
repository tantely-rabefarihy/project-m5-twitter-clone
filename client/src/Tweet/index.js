import React, { useContext } from "react";
import styled from "styled-components";
import { FeedsDataContext } from "../Contexts/FeedsDataContext";
import { Stats } from "./Stats";
import Header from "./Header";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";

const Tweet = ({
  status,
  time,
  numLikes,
  numRetweets,
  isLiked,
  isRetweeted,
  authorData,
  media,
  id,
}) => {
  //   console.log("MEDIA: ", media[0].url);

  //  Redirecting user to the tweet they clicked
  let history = useHistory();
  const handleRedirection = (tweetId) => {
    history.push(`/tweet/${tweetId}`);
  };

  const tweetMedia = media[0]?.url ?? "";
  return (
    <Wrapper>
      <Header authorData={authorData} time={time} />
      <Details onClick={() => handleRedirection(id)}>
        <TweetContents>{status}</TweetContents>
        {tweetMedia ? <MediaPost src={tweetMedia} /> : <></>}
      </Details>
      <ActionBar isLiked={isLiked} isRetweeted={isRetweeted} />
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  width: 90%;
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
const Details = styled.div`
  margin-top: -30px;
  width: 85%;
  display: flex;
  flex-direction: column;
  align-self: left;
  padding-left: 60px;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

export default Tweet;
