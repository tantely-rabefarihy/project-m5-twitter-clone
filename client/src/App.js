import React from "react";
import {BrowserRouter, BrowserRouter as Route, Switch} from "react-router-dom";
import Bookmarks from "./Bookmarks";
import GlobalStyles from "./GlobalStyles";
import HomeFeed from "./HomeFeed";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import TweetDetails from "./TweetDetails";
import styled from "styled-components";




const App = () => {


  return (
    <BrowserRouter>
    <GlobalStyles />
      <Wrapper>
        <Sidebar/>
        {}
        <Switch>
          <Route exact path="/">
            <HomeFeed/>
          </Route>
          <Route exact path="/notifications" >
            <Notifications />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmarks/>
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetails/>
          </Route>
          <Route exact path="/abc">
            <Profile/>
          </Route>
        </Switch>
      </Wrapper>
      
    </BrowserRouter>
    
  );
}


const Wrapper = styled.div `
display:flex;
`



export default App;
