import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Bookmarks from "./Bookmarks";
import GlobalStyles from "./GlobalStyles";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import TweetDetails from "./TweetDetails";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";

const App = () => {
  const { currentUser, status } = useContext(CurrentUserContext);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Wrapper>
        <Sidebar />
        {}
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route path="/notifications">
            <Notifications />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks />
          </Route>
          <Route path="/tweet/:tweetId">
            <TweetDetails />
          </Route>
          <Route path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  display: flex;
`;

export default App;
