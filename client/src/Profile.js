import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { SpecificUserContext } from "./Contexts/SpecificUserContext";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "./constants";
import { FiMapPin, FiCalendar } from "react-icons/fi";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import Tweet from "./Tweet";

const Profile = ({ currentUser, status }) => {
  const { profileId } = useParams();
  console.log("PROFILEID: ", profileId);

  //   NOW' , i just need to do a fetch and retrieve the data and use the state to display the profile wanted.

  // const handle = UserInfo?.User?.profile;
  const [userInfo, setUserInfo] = useState();
  const [userFeeds, setUserFeeds] = useState();
  const [tweetsOrder, setTweetsOrder] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    async function getUserData(userHandle) {
      let response = await fetch(`/api/${userHandle}/profile`);
      let feedResponse = await fetch(`/api/${userHandle}/feed`);
      let data = await response.json();
      let profileFeed = await feedResponse.json();
      return { data, profileFeed };
    }

    getUserData(profileId).then((data) => {
      // DATE OF POSTING
      const getDate = (t) => {
        let date = parseISO(t);
        return format(date, "MMMM yyyy");
      };
      const dateJoined = getDate(data.data.profile.joined);
      // ****************

      // DEFINING THE STATES
      setUserInfo({ ...data.data.profile, dateJoined });
      setUserFeeds(Object.values(data.profileFeed.tweetsById));
      setTweetsOrder(data.profileFeed.tweetsIds);
      setPageStatus("idle");
      // ************
    });
  }, []);

  // SORTING THE USER's TWEETS
  const sortedUserTweets = userFeeds?.sort((a, b) => {
    return tweetsOrder?.indexOf(a.id) - tweetsOrder?.indexOf(b.id);
  });
  console.log("sortedUserTweets: ", sortedUserTweets);

  return (
    <Wrapper>
      {/* {sortedUserTweets[0].retweetFrom?.displayName ? (
        <div>{sortedUserTweets[0]?.retweetFrom?.displayName}</div>
      ) : (
        <></>
      )} */}
      <Images>
        <Banner src={userInfo?.bannerSrc} />
        <Avatar src={userInfo?.avatarSrc} />
        {userInfo?.isBeingFollowedByYou ? (
          <FollowBtn>Following</FollowBtn>
        ) : (
          <FollowBtn>Follow</FollowBtn>
        )}
      </Images>

      <InfoContainer>
        <Name>{userInfo?.displayName}</Name>
        <HandleContainer>
          <UserName>@{userInfo?.handle}</UserName>
          {userInfo?.isFollowingYou ? <FollowMe>Follows you</FollowMe> : null}
        </HandleContainer>
        <div>{userInfo?.bio}</div>
        <LocationDate>
          {userInfo?.location ? (
            <div>
              <FiMapPin color="grey" style={{ marginRight: "5px" }} />
              {userInfo?.location}
            </div>
          ) : null}
          <FiCalendar style={{ margin: " 0 5px" }} /> Joined
          {userInfo?.dateJoined}
          {}
        </LocationDate>
        <NumFollow>
          <div>{userInfo?.numFollowing} Following</div>
          <div>{userInfo?.numFollowers} Followers</div>
        </NumFollow>
      </InfoContainer>

      <Tabs>
        <button>Tweets</button>
        <button>Media</button>
        <button>Likes</button>
      </Tabs>

      <FeedsArea>
        {sortedUserTweets !== undefined
          ? sortedUserTweets?.map((singleTweet, index) => {
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
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 100px;
`;

const Images = styled.div`
  height: 400px;
  position: relative;
`;

const Banner = styled.img`
  width: 100%;
  height: 300px;
`;

const Avatar = styled.img`
  border: 5px solid white;
  border-radius: 50%;
  height: 10rem;
  width: 10rem;
  position: absolute;
  top: 55%;
  left: 2%;
`;

const FollowBtn = styled.div`
  align-content: center;
  text-align: center;
  border-radius: 25px;
  font-size: 18px;
  font-weight: bolder;
  padding: 10px;
  width: 150px;
  height: 50px;
  background-color: ${COLORS.primary};
  color: white;
  position: absolute;
  top: 80%;
  right: 5%;
  margin-top: 10px;
  display: inline-grid;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 5px;
`;

const HandleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  margin-bottom: 10px;
`;

const UserName = styled.div`
  font-size: 14px;
  margin-right: 5px;
`;

const FollowMe = styled.div`
  font-size: 12px;
  color: grey;
  border-radius: 10px;
  background-color: whitesmoke;
  width: 70px;
  padding: 3px;
`;

const InfoContainer = styled.div``;

const LocationDate = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 12px;
  color: grey;

  justify-items: space-between;
  margin: 10px 0;
`;

const NumFollow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const Tabs = styled.div`
  margin: 40px auto 20px;
  width: 100%;
  display: flex;
  flex-direction: row;

  button {
    width: 100%;
    color: grey;
    background-color: transparent;
    border: none;
    font-size: 18px;
    font-weight: bolder;
    outline: none;
    padding-bottom: 10px;

    &:focus {
      border-bottom: 3px solid ${COLORS.primary};
      color: ${COLORS.primary};
    }
  }
`;

const FeedsArea = styled.div`
  width: 100%;
`;

export default Profile;
