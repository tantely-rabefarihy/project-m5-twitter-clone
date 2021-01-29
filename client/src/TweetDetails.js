import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import ActionBar from "./Tweet/ActionBar";

const TweetDetails = () => {
  const { tweetId } = useParams();
  const [tweetInfo, setTweetInfo] = useState();

  useEffect(() => {
    async function getTweetInfo(id) {
      let response = await fetch(`/api/tweet/${id}`);
      let data = await response.json();
      return data;
    }

    getTweetInfo(tweetId).then((data) => {
      //   GET THE DATE OF POSTING
      const getDate = (t) => {
        let date = parseISO(t);
        return format(date, "h:mm a MMM d yyyy");
      };
      const tweetDate = getDate(data.tweet.timestamp);
      // DEFINING THE STATE
      setTweetInfo({ ...data.tweet, tweetDate });
    });
  }, []);

  console.log("ONE TWEET: ", tweetInfo);

  // TWEET PICTURE
  const tweetMedia = tweetInfo?.media[0]?.url ?? "";

  return (
    <Wrapper>
      <Header>
        <Avatar src={tweetInfo?.author?.avatarSrc} />
        <Name>
          <DisplayName>{tweetInfo?.author?.displayName}</DisplayName>
          <Username>@{tweetInfo?.author?.handle}</Username>
        </Name>
      </Header>
      <Details>
        <TweetStatus>{tweetInfo?.status}</TweetStatus>
        {tweetMedia ? <MediaPost src={tweetMedia} /> : <></>}
        <TimeStamp>
          {tweetInfo?.tweetDate}
          <Point>&#183;</Point>Critter Web app
        </TimeStamp>
      </Details>
      <ActionBar />
      <Divider />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 10px;
  width: auto;
  text-align: left;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 300px;
  justify-items: space-between;
`;

const DisplayName = styled.div`
  font-size: 15px;
  line-height: 20px;
  font-weight: bold;
  margin-right: 5px;
`;

const Username = styled.div`
  font-size: 15px;
  line-height: 20px;
  color: rgb(101, 119, 134);
  margin-right: 5px;
`;

const TweetStatus = styled.div`
  margin-bottom: 10px;
  font-size: 18px;
`;

const MediaPost = styled.img`
  border-radius: 10px;
  width: auto;
  height: 350px;
`;

const Details = styled.div``;

const TimeStamp = styled.div`
  color: rgb(101, 119, 134);
  line-height: 20px;
  font-size: 15px;
  margin-left: 5px;
  display: flex;
  width: auto;
`;

const Divider = styled.div`
  height: 1px;
  background: rgb(230, 236, 240);
`;

const Point = styled.div`
  margin: 0 5px;
`;
export default TweetDetails;
