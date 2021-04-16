import { React, createContext, useState } from "react";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(true);

  const getPostsData = (params = {}) => {
    console.log(params);
    setIsLoading(true);
    axios
      .get("http://localhost:8000/posts/", {
        headers: {
          authToken: authToken,
        },
        params: params,
      })
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.log(response);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

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
        isLoading,
        getPostsData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
