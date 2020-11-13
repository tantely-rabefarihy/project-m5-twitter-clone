import React, { useContext, useEffect, useState } from "react";

export const SpecificUserContext = React.createContext(null);

export const SpecificUserProvider = ({ children }) => {
  const [userFeed, setUserFeed] = useState();
  // const [tweetsOrder, setTweetsOrder] = useState([]);
  // const [orderedData, setOrderedData] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    async function getUserData(handle) {
      let response = await fetch(`/api/${handle}/profile`);
      let data = await response.json();
      return data;
    }

    getUserData().then((data) => {
      setUserFeed(data);

      // setCurrentFeed(Object.values(data));
      // setTweetsOrder(Object.values(data));
      // setPageStatus("idle");
    });
  }, []);

  console.log("DATA: ", userFeed);

  return (
    <SpecificUserContext.Provider value={{ userFeed }}>
      {children}
    </SpecificUserContext.Provider>
  );
};
