import { React, useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grow,
  Grid,
  AppBar,
  ThemeProvider,
} from "@material-ui/core";
import memories from "./images/memories.png";
import useStyles from "./styles";
import Form from "./components/Form";
import axios from "axios";
import Posts from "./components/Posts";
import { theme } from "./Theme";

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios
      .get("http://localhost:8000/posts/")
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPosts();
  }, []);

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
              justify="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item xs={12} sm={8}>
                <Posts posts={posts} setPosts={setPosts} />
              </Grid>
              <Grid item xs={12} sm={4}>
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
