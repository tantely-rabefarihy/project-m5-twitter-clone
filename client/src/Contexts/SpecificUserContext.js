import React, { useContext, useEffect, useState } from "react";

export const SpecificUserContext = React.createContext(null);

export const SpecificUserProvider = ({ children }) => {
  const [userFeed, setUserFeed] = useState();
  const [pageStatus, setPageStatus] = useState("loading");

  useEffect(() => {
    async function getUserData(handle) {
      let response = await fetch(`/api/${handle}/profile`);
      let data = await response.json();
      return data;
    }

    getUserData().then((data) => {
      setUserFeed(data);
    });
  }, []);

  console.log("DATA: ", userFeed);

  return (
    <SpecificUserContext.Provider value={{ userFeed }}>
      {children}
    </SpecificUserContext.Provider>
  );
};
