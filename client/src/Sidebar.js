import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { COLORS } from "./constants";
import styled from "styled-components";
import { ReactComponent as Logo } from "./assets/logo.svg";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";
import { themeVars } from "./GlobalStyles";
import { CurrentUserContext } from "./CurrentUserContext";
import { useHistory } from "react-router-dom";
import { Loading } from "./LoadingPage";

const Sidebar = () => {
  const userInfo = useContext(CurrentUserContext);
  const handle = userInfo?.currentUser?.profile?.handle;
  let history = useHistory();

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     history.push(`/${pageName}`);
  //   }
  // };

  return (
    <>
      {userInfo ? (
        <Wrapper>
          <Logo style={{ width: "50px", height: "50px", marginLeft: "12px" }} />
          <LinkWrapper tabIndex="0">
            <FiHome style={{ width: "20px", height: "20px" }} />
            <NavigationLink tabIndex="-1" to="/">
              Home
            </NavigationLink>
          </LinkWrapper>
          <LinkWrapper tabIndex="0">
            <FiUser style={{ width: "20px", height: "20px" }} />
            {/* {handle ? ( */}
            <NavigationLink tabIndex="-1" to={`/${handle}`}>
              Profile
            </NavigationLink>
            {/* // ) : ( */}

            {/* // )} */}
          </LinkWrapper>
          <LinkWrapper tabIndex="0">
            <FiBell style={{ width: "20px", height: "20px" }} />
            <NavigationLink tabIndex="-1" to="/notifications">
              Notifications
            </NavigationLink>
          </LinkWrapper>
          <LinkWrapper tabIndex="0">
            <FiBookmark style={{ width: "20px", height: "20px" }} />
            <NavigationLink tabIndex="-1" to="/bookmarks">
              Bookmarks
            </NavigationLink>
          </LinkWrapper>
        </Wrapper>
      ) : (
        <Loading />
      )}
    </>
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

  &.active:focus {
    color: ${COLORS.primary};
  }
`;

export default Sidebar;
