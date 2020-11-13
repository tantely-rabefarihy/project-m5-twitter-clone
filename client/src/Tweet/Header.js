import React, { useContext } from "react";
import styled from "styled-components";
import { FeedsDataContext } from "../Contexts/FeedsDataContext";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { useHistory } from "react-router-dom";

const Header = ({ authorData, time }) => {
  const { avatarSrc, displayName, handle } = authorData;

  //  Redirecting user to the tweet's owner profile
  let history = useHistory();
  const handleRedirection = (handle) => {
    history.push(`/${handle}/profile`);
  };

  //   GET THE DATE OF POSTING
  const getDate = (t) => {
    let date = parseISO(t);
    return format(date, "MMM do");
  };

  return (
    <Wrapper onClick={() => handleRedirection(handle)}>
      <Avatar src={avatarSrc} />
      <Name>
        <DisplayName>{displayName}</DisplayName>
        <Username>@{handle}</Username>
        <span>&#183;</span>
        <TimeStamp>{getDate(time)}</TimeStamp>
      </Name>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  position: relative;
  cursor: pointer;
`;

const Avatar = styled.img`
  position: absolute;
  left: -55px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Name = styled.div`
  display: flex;
  flex-direction: row;
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

const TimeStamp = styled.div`
  color: rgb(101, 119, 134);
  line-height: 20px;
  font-size: 15px;
  margin-left: 5px;
`;

export default Header;
