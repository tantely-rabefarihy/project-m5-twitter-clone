import React, { useContext, useEffect, useState } from "react";

export const HandleToggleContext = React.createContext(null);

export const HandleToggleProvider = ({ children }) => {
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [numOfRetweets, setNumOfRetweets] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setNumOfLikes(isLiked === false ? numOfLikes + 1 : numOfLikes - 1);
  };

  const handleToggleRetweet = () => {
    setIsRetweeted(isRetweeted === false ? true : false);
    setNumOfRetweets(
      isRetweeted === false ? numOfRetweets + 1 : numOfRetweets - 1
    );
  };

  return (
    <HandleToggleContext.Provider
      value={{
        isRetweeted: isRetweeted,
        isLiked: isLiked,
        numOfLikes,
        numOfRetweets,
        handleToggleLike: handleToggleLike,
        handleToggleRetweet: handleToggleRetweet,
      }}
    >
      {children}
    </HandleToggleContext.Provider>
  );
};
