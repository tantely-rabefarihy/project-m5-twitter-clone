import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FeedsDataContext } from "../Contexts/FeedsDataContext";
import Header from "./Header";
import ActionBar from "./ActionBar";
import { useHistory } from "react-router-dom";
import { AiOutlineRetweet } from "react-icons/ai";

const Tweet = ({
  status,
  time,
  numRetweets,
  authorData,
  media,
  id,
  isRetweeted,
  isLiked,
  numLikes,
  retweetFrom,
}) => {
  const [optimisticLike, setOptimisticLike] = useState(isLiked);
  const [optimisticNumLikes, setOptimisticNumLikes] = useState(numLikes);
  const [errorStatus, setErrorStatus] = useState("");

  //  Redirecting user to the tweet they clicked
  let history = useHistory();
  const handleRedirection = (tweetId) => {
    history.push(`/tweet/${tweetId}`);
  };
  //   GET PICTURE SOURCE
  const tweetMedia = media[0]?.url ?? "";

  //   HANDLE THE LIKE
  const onLikeClick = async ({ isLiked, id }) => {
    const incOrDec = isLiked ? -1 : 1;
    setOptimisticNumLikes(optimisticNumLikes + incOrDec);
    setOptimisticLike(!isLiked);

    try {
      await fetch(`/api/tweet/${id}/like`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          like: !isLiked,
        }),
      });
    } catch (err) {
      setErrorStatus(err);
    }
  };

  return (
    <>
      <Wrapper tabIndex="0">
        {retweetFrom?.displayName ? (
          <Retweet>
            <AiOutlineRetweet
              style={{
                marginRight: "10px",
              }}
            />
            {retweetFrom?.displayName}
            Remeowed
          </Retweet>
        ) : (
          <></>
        )}
        <Header authorData={authorData} time={time} />
        <Details tabIndex="-1" onClick={() => handleRedirection(id)}>
          <TweetContents>{status}</TweetContents>
          {tweetMedia ? <MediaPost src={tweetMedia} /> : <></>}
        </Details>
        <ActionBar
          isLiked={optimisticLike}
          isRetweeted={isRetweeted}
          onLikeClick={onLikeClick}
          id={id}
          numLikes={optimisticNumLikes}
        />

        <Divider />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  width: 80%;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const Retweet = styled.div`
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  line-height: 20px;
  color: rgb(101, 119, 134);
  margin: 5px 0 10px 30px;
  width: fit-content;
  line-height: 1;
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
