import { React } from "react";
import { Container, Grid } from "@material-ui/core";
import Post from "./Post";

function Posts({ posts, setPosts }) {
  return (
    <Container maxWidth="lg">
      <Grid item container spacing={3} justify="center" alignItems="flex-start">
        {posts.map((post, id) => (
          <Grid item key={`post_${id}`}>
            <Post post={post} posts={posts} setPosts={setPosts} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Posts;
