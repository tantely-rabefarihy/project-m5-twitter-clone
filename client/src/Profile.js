import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { SpecificUserContext } from "./Contexts/SpecificUserContext";
import { CurrentUserContext } from "./CurrentUserContext";

const Profile = ({ currentUser, status }) => {
  const { profileId } = useParams();
  console.log("PROFILEID: ", profileId);

  //   NOW' , i just need to do a fetch and retrieve the data and use the state to display the profile wanted.

  // console.log("USER INFO : ", UserInfo);

  // const handle = UserInfo?.User?.profile;
  const [userInfo, setUserInfo] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    async function getUserData(userHandle) {
      let response = await fetch(`/api/${userHandle}/profile`);
      let data = await response.json();
      return data;
    }

    getUserData(profileId).then((data) => {
      setUserInfo(data.profile);
      setPageStatus("idle");
      // setCurrentFeed(Object.values(data));
      // setTweetsOrder(Object.values(data));
    });
  }, []);

  console.log("USER FEED", userInfo);

  // const {
  // //   avatarSrc,
  //   bannerSrc,
  // //   bio,
  // //   displayName,
  // //   handle,
  // //   isBeingfollowedByYou,
  // //   isFollowingYou,
  // //   joined,
  // //   numFollowers,
  // //   numFollowing,
  // //   numLikes,
  // } = userInfo ;

  return (
    <Wrapper>
      <Images>
        <Banner src={userInfo?.bannerSrc} />
        <Avatar src={userInfo?.avatarSrc} />
      </Images>
      {userInfo?.isBeingfollowedByYou ? (
        <button>Following</button>
      ) : (
        <button>Follow</button>
      )}
      <InfoContainer>
        <div>{userInfo?.displayName}</div>
        <div>{userInfo?.handle}</div>
        {userInfo?.isFollowingYou ? <span>Follows you</span> : null}
        <div>{userInfo?.currentUser}</div>
        <div>{userInfo?.bio}</div>
        {userInfo?.location ? <div>{userInfo?.location}</div> : null}
        <div>{userInfo?.joined}</div>
        <div>{userInfo?.numFollowing}</div>
        <div>{userInfo?.numFollowers}</div>
      </InfoContainer>
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
  margin-bottom: 20px;
`;

const Banner = styled.img`
  width: 100%;
  height: 300px;
  position: relative;
`;

const Avatar = styled.img`
  border: 5px solid white;
  border-radius: 50%;
  height: 180px;
  width: 180px;
  position: absolute;
  top: calc(100% / 3);
  left: 20%;
`;

const InfoContainer = styled.div`
  margin-top: 20px;
`;
export default Profile;
