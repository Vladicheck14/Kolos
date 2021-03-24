import { React, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grow,
  Grid,
  AppBar,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import memories from "./images/memories.png";
import useStyles from "./styles";
import Form from "./components/Form";
import axios from "axios";
import Posts from "./components/Posts";
import { theme } from "./Theme";
import loading from "./images/loading.gif";

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = () => {
    axios
      .get("http://localhost:8000/posts/")
      .then((response) => {
        setIsLoading(false);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPosts();
  }, []);
  const matchesXs = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
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
        </AppBar>
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
                {!isLoading ? (
                  <Posts posts={posts} setPosts={setPosts} />
                ) : (
                  <img src={loading} alt="loading" />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                <Form posts={posts} setPosts={setPosts} />
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
    </ThemeProvider>
  );
}

export default App;
