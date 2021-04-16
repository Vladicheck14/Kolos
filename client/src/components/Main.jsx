import { React, useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Grow,
  Grid,
  AppBar,
  Button,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import memories from "../images/memories.png";
import useStyles from "./styles";
import Form from "./Form";
import axios from "axios";
import FilterPanel from "./FilterPanel";
import Posts from "./Posts";
import { theme } from "../Theme";
import loading from "../images/loading.gif";
import { GlobalContext } from "../ContextProvider";
import { Redirect } from "react-router-dom";

function App() {
  const classes = useStyles();

  const {
    posts,
    authToken,
    isLoggedIn,
    firstName,
    lastName,
    email,
    userId,
    isLoading,
    getPostsData,
  } = useContext(GlobalContext);
  const [, setPostsValue] = posts;
  const [authTokenValue, setAuthTokenValue] = authToken;
  const [isLoggedInValue, setIsLoggedInValue] = isLoggedIn;
  const [, setFirstNameValue] = firstName;
  const [, setLastNameValue] = lastName;
  const [, setEmailValue] = email;
  const [, setUserIdValue] = userId;

  useEffect(() => {
    const getUser = () => {
      axios
        .get("http://localhost:8000/api/getInfo", {
          headers: {
            authToken: authTokenValue,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            const userData = response.data;
            setFirstNameValue(userData.firstName);
            setLastNameValue(userData.lastName);
            setEmailValue(userData.email);
            setUserIdValue(userData.userId);
          }
        })
        .catch((error) => {
          localStorage.removeItem("authToken");
          setAuthTokenValue("");
          setIsLoggedInValue(false);
        });
    };
    if (isLoggedInValue) {
      getPostsData();
      getUser();
    } else {
      setEmailValue("");
      setAuthTokenValue("");
      setFirstNameValue("");
      setLastNameValue("");
      setPostsValue([]);
      setUserIdValue("");
      localStorage.removeItem("authToken");
    }
  }, [
    isLoggedInValue,
    authTokenValue,
    setPostsValue,
    setLastNameValue,
    setUserIdValue,
    setEmailValue,
    setFirstNameValue,
    setAuthTokenValue,
    setIsLoggedInValue,
  ]);
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
      {isLoggedIn && (
        <Container maxWidth="lg">
          <AppBar position="static" color="inherit" className={classes.appBar}>
            <Typography className={classes.heading} variant="h2" align="center">
              Memories
            </Typography>
            <img
              src={memories}
              alt="memories"
              height="40"
              className={classes.image}
            />
            <Button
              className={classes.logout}
              variant="contained"
              color="secondary"
              onClick={() => {
                localStorage.removeItem("authToken");
                window.location.reload();
              }}
            >
              Log out
            </Button>
          </AppBar>
          <FilterPanel />
          <Grow in>
            <Container>
              <Grid
                container
                justify="center"
                alignItems="stretch"
                spacing={3}
                direction={matchesXs ? "column-reverse" : "row"}
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                  container
                  justify="center"
                  alignItems="center"
                >
                  {!isLoading ? <Posts /> : <img src={loading} alt="loading" />}
                </Grid>
                <Grid item xs={12} md={4}>
                  <Form />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      )}
      {!isLoggedInValue && <Redirect to="/Login" />}
    </ThemeProvider>
  );
}

export default App;
