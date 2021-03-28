import { React, useContext } from "react";
import { Container, Grid, Typography, useMediaQuery } from "@material-ui/core";
import Post from "./Post";
import { useTheme } from "@material-ui/core/styles";
import { GlobalContext } from "../../ContextProvider";
import useStyles from "./styles";

function Posts() {
  const theme = useTheme();
  const matchesLg = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();
  const { posts } = useContext(GlobalContext);
  const [postsValue, setPostsValue] = posts;
  return (
    <Container maxWidth="lg">
      <Grid
        item
        container
        spacing={3}
        justify={!matchesLg ? "center" : "flex-start"}
        alignItems="flex-start"
      >
        {postsValue.length > 0 &&
          postsValue.map((post, id) => (
            <Grid item key={`post_${id}`}>
              <Post post={post} posts={postsValue} setPosts={setPostsValue} />
            </Grid>
          ))}
        {postsValue.length === 0 && (
          <Typography variant="h2" className={classes.noposts}>
            NO POSTS
          </Typography>
        )}
      </Grid>
    </Container>
  );
}

export default Posts;
