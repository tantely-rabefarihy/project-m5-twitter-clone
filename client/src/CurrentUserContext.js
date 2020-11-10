import React, {useContext, useState} from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [status, setStatus] = useState("loading");


// Fetch the user data from the API (/me/profile)
const fetchData = async () => {
    try {
        const response = await fetch("/api/me/profile");
    const json = await response.json();
 // When the data is received, update currentUser.
    setCurrentUser(json);
    setStatus("idle")
    } catch (error) {
        console.log(error);
    }
    

} 

 
  // Also, set `status` to `idle`



    return (
        <CurrentUserContext.Provider 
        value={{currentUser, status}}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}

