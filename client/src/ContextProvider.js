import { React, createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(
    authToken !== null && authToken !== undefined && authToken !== ""
  );

  return (
    <GlobalContext.Provider
      value={{
        posts: [posts, setPosts],
        firstName: [firstName, setFirstName],
        lastName: [lastName, setLastName],
        email: [email, setEmail],
        authToken: [authToken, setAuthToken],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userId: [userId, setUserId],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
