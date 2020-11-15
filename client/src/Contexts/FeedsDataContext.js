import React, { useContext, useEffect, useState } from "react";
import { FaRegFontAwesomeLogoFull } from "react-icons/fa";

export const FeedsDataContext = React.createContext(null);

export const FeedsDataProvider = ({ children }) => {
  const [currentFeed, setCurrentFeed] = useState();
  const [tweetsOrder, setTweetsOrder] = useState([]);
  const [orderedData, setOrderedData] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    async function getFeedData() {
      let response = await fetch("/api/me/home-feed");
      let data = await response.json();
      return data;
    }

    getFeedData().then((data) => {
      setCurrentFeed(Object.values(data.tweetsById));
      setTweetsOrder(Object.values(data.tweetIds));
      setPageStatus("idle");
    });
  }, []);

  // SORTING THE FEEDS DATA ARRAY
  const sortedData = currentFeed?.sort((a, b) => {
    return tweetsOrder.indexOf(a.id) - tweetsOrder.indexOf(b.id);
  });

  const toggleLikeTweet = async (tweetId) => {
    // .map over orderedData
    // if (tweet.id ==== tweetId) toggle isLiked

    const dataWithLikes = sortedData?.map((tweet) => {
      if (tweet.id === tweetId) {
        return {
          ...tweet,
          isLiked: !tweet.isLiked,
        };
      }

      return tweet;
    });
    setCurrentFeed(dataWithLikes);

    const raw = await fetch(`/api/tweet/${tweetId}/like`, {
      method: "PUT",
      headers: {
        Accept: "Apploication/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        like: true || false,
      }),
    });

    const json = await raw.json();
  };

  return (
    <FeedsDataContext.Provider
      value={{
        sortedData,
        orderedData,
        toggleLikeTweet: toggleLikeTweet,
      }}
    >
      {children}
    </FeedsDataContext.Provider>
  );
};
