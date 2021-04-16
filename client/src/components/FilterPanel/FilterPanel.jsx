import { useState, useContext } from "react";
import {
  Paper,
  Grid,
  Switch,
  Checkbox,
  FormControl,
  FormLabel,
  TextField,
  ButtonGroup,
  Button,
  FormGroup,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import styles from "./style";
import clsx from "clsx";
import axios from "axios";
import { GlobalContext } from "../../ContextProvider";

export default function FilterPanel() {
  const classes = styles();
  const [withLikes, setWithLikes] = useState(false);
  const [withComments, setWithComments] = useState(false);
  const [expand, setExpand] = useState(false);
  const { posts, authToken, getPostsData } = useContext(GlobalContext);
  const [commentor, setCommentor] = useState("");
  const [, setPosts] = posts;
  const [commentorError, setCommentorError] = useState(false);
  const [authTokenValue] = authToken;

  const handleFilteredPosts = () => {
    if (!withComments && !withLikes && commentor === "") {
      getPostsData();
      return;
    }
    getPostsData({ withLikes, withComments, commentor });
  };
  const undoFiltredData = () => {
    setWithLikes(false);
    setCommentor("");
    setWithComments(false);
    getPostsData();
  };
  return (
    <Paper
      className={
        expand
          ? classes.filterPaper
          : clsx(classes.filterPaperNotExpanded, classes.filterPaper)
      }
    >
      {expand && (
        <Grid container direction="column">
          <Grid
            item
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Likes and Comments</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withLikes}
                        onChange={() => setWithLikes(!withLikes)}
                        name="likes"
                      />
                    }
                    label="With Likes"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={withComments}
                        onChange={() => setWithComments(!withComments)}
                        name="comments"
                      />
                    }
                    label="With Comments"
                  />
                </FormGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl component="fieldset">
                <FormLabel component="legend">Comments</FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <TextField
                        label="Commentor"
                        disabled={!withComments}
                        value={commentor}
                        error={commentorError}
                        onChange={(e) => {
                          if (e.target.value > 10) {
                            setCommentorError(true);
                            return;
                          } else {
                            setCommentorError(false);
                            setCommentor(e.target.value);
                          }
                        }}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container alignItems="center" justify="center">
            <ButtonGroup>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFilteredPosts}
              >
                Search
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={undoFiltredData}
              >
                Undo
              </Button>
            </ButtonGroup>
            <IconButton
              onClick={() => setExpand(false)}
              style={{ position: "absolute", bottom: 0, right: 0 }}
            >
              <ExpandLessIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {!expand && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setExpand(true)}
        >
          SHOW FILTERS
        </Button>
      )}
    </Paper>
  );
}
