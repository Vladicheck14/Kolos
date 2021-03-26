import { React, useContext } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Post from "./Post";
import { GlobalContext } from "../../ContextProvider";
import useStyles from "./styles";

function Posts() {
  const classes = useStyles();
  const { posts } = useContext(GlobalContext);
  const [postsValue, setPostsValue] = posts;
  return (
    <Container maxWidth="lg">
      <Grid item container spacing={3} justify="center" alignItems="flex-start">
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
