import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";
import styled from "styled-components";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { themeVars } from "./GlobalStyles";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const userInfo = useContext(CurrentUserContext);
  // console.log("USER INFO : ", userInfo);

  const handle = userInfo?.currentUser?.profile?.handle;

  // console.log(handle);

  return (
    <Wrapper>
      <Logo style={{ width: "50px", height: "50px", marginLeft: "12px" }} />
      <LinkWrapper>
        <FiHome style={{ width: "20px", height: "20px" }} />
        <NavigationLink to="/">Home</NavigationLink>
      </LinkWrapper>
      <LinkWrapper>
        <FiUser style={{ width: "20px", height: "20px" }} />
        {handle ? (
          <NavigationLink to={`/${handle}`}>Profile</NavigationLink>
        ) : (
          "LOADING"
        )}
      </LinkWrapper>
      <LinkWrapper>
        <FiBell style={{ width: "20px", height: "20px" }} />
        <NavigationLink to="/notifications">Notifications</NavigationLink>
      </LinkWrapper>
      <LinkWrapper>
        <FiBookmark style={{ width: "20px", height: "20px" }} />
        <NavigationLink to="/bookmarks">Bookmarks</NavigationLink>
      </LinkWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 300px;
  width: 200px;
  padding-top: 20px;
`;

const LinkWrapper = styled.div`
  display: flex;
  margin: 0 20px;
  padding: 8px;

  &:hover {
    border-radius: 20px;
    background-color: ${COLORS.opacity};
  }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  display: flex;
  margin-left: 15px;
  font-family: ${themeVars.contentFont};
  font-size: 18px;
  font-weight: bolder;

  &.active {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
