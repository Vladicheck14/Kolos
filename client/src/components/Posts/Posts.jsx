import { React, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import Post from "./Post";
import { GlobalContext } from "../../ContextProvider";

function Posts() {
  const { posts } = useContext(GlobalContext);
  const [postsValue, setPostsValue] = posts;
  return (
    <Container maxWidth="lg">
      <Grid item container spacing={3} justify="center" alignItems="flex-start">
        {postsValue.map((post, id) => (
          <Grid item key={`post_${id}`}>
            <Post post={post} posts={postsValue} setPosts={setPostsValue} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Posts;
