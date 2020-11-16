import React, { useContext, useEffect, useState } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  // Fetch the user data from the API (/me/profile)

  useEffect(() => {
    async function getUserData() {
      let response = await fetch("/api/me/profile");
      let data = await response.json();
      return data;
    }
    getUserData().then((data) => {
      setCurrentUser(data);
      setStatus("idle");
    });
  }, []);

  //

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
