import { React, useState, useEffect, useContext } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from "uuid";
import CommentIcon from "@material-ui/icons/Comment";
import Button from "@material-ui/core/Button";
import moment from "moment";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./style";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import loadingPic from "../../../images/loading.gif";
import { motion } from "framer-motion";
import { GlobalContext } from "../../../ContextProvider";

export default function Post({ post, posts, setPosts }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likedUsers.length);
  const [comments, setComments] = useState(post.comments);
  const [commentsCount, setCommentsCount] = useState(0);
  const [openComments, setOpenComments] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const needExpand = post.message.length > 35;
  const { authToken, userId } = useContext(GlobalContext);
  const [authTokenValue] = authToken;
  const [userIdValue] = userId;
  const [fromNow, setFromNow] = useState(true);
  const [commentIsSending, setCommentIsSending] = useState(false);
  const [commentIsDeleting, setCommentIsDeleting] = useState(false);
  const [commentTextError, setCommentTextError] = useState(false);
  useEffect(() => {
    if (post.likedUsers.includes(userIdValue)) {
      setIsLiked(true);
    }
  }, [post.likedUsers, userIdValue]);

  useEffect(() => {
    setCommentsCount(comments.length);
  }, [comments]);
  const classes = styles();
  const dateOptions = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
    time: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(post.createdAt);
  const deletePost = () => {
    setLoading(true);
    axios
      .post(
        "http://localhost:8000/posts/delete",
        { id: post._id },
        {
          headers: {
            authToken: authTokenValue,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          setPosts(posts.filter((item) => item._id !== post._id));
        }
      })
      .catch((error) => console.log(error));
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const pasteCommentHandler = () => {
    setCommentIsSending(true);
    axios
      .post(
        "http://localhost:8000/posts/addComment",
        { postId: post._id, commentText },
        {
          headers: {
            authToken: authTokenValue,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data.comments);
        }
        setCommentIsSending(false);
        setCommentText("");
      })
      .catch((error) => console.log(error));
  };
  const commentTextHandler = (e) => {
    if (e.length > 15) {
      setCommentTextError(true);
      return;
    } else {
      setCommentTextError(false);
      setCommentText(e);
    }
  };
  const deleteCommentHandler = (commentId) => {
    setCommentIsDeleting(true);
    axios
      .post(
        "http://localhost:8000/posts/removeComment",
        { postId: post._id, commentId },
        {
          headers: {
            authToken: authTokenValue,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data.comments);
        }
        setCommentIsDeleting(false);
      })
      .catch((error) => console.log(error));
  };
  const openCommentsHandler = () => {
    setOpenComments(!openComments);
  };
  const likeHandler = () => {
    if (!isLiked) {
      axios
        .post(
          "http://localhost:8000/posts/like",
          { id: post._id, like: "add" },
          {
            headers: {
              authToken: authTokenValue,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setLikesCount(response.data.likes);
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .post(
          "http://localhost:8000/posts/like",
          { id: post._id, like: "remove" },
          {
            headers: {
              authToken: authTokenValue,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setLikesCount(response.data.likes);
          }
        })
        .catch((error) => console.log(error));
    }
    setIsLiked(!isLiked);
  };
  return (
    <Card className={classes.root} component={motion.div}>
      <CardHeader
        onMouseEnter={() => setFromNow(false)}
        onMouseLeave={() => setFromNow(true)}
        title={post.title}
        subheader={
          fromNow
            ? moment(post.createdAt).fromNow()
            : date.toLocaleDateString("en-US", dateOptions)
        }
        avatar={
          <Avatar aria-label="avatar" className={classes.avatar}>
            {post.creatorName.charAt(0).toUpperCase()}
          </Avatar>
        }
      />
      <CardMedia
        component="img"
        src={post.selectedFile}
        className={classes.media}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          style={{
            wordWrap: "break-word",
            marginBottom: openComments && "2em",
          }}
        >
          {!expanded &&
            (needExpand ? `${post.message.substring(0, 32)}...` : post.message)}
          {expanded && post.message}
        </Typography>
        {openComments && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Grid container direction="column">
              <Grid item>
                <Paper>
                  {comments.map((comment, id) => (
                    <div key={uuidv4()}>
                      <Grid container direction="row" alignItems="center">
                        <Grid item>
                          <Avatar
                            aria-label="commentsavatar"
                            className={classes.avatarComment}
                          >
                            {comment.userName.charAt(0).toUpperCase()}
                          </Avatar>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="body2"
                            component="p"
                            style={{ wordWrap: "break-word" }}
                          >
                            {comment.commentText}
                          </Typography>
                        </Grid>
                        {userIdValue === comment.userID && (
                          <Grid item style={{ marginLeft: "auto" }}>
                            <IconButton
                              aria-label="delete comment"
                              disabled={commentIsDeleting}
                              onClick={() => deleteCommentHandler(comment._id)}
                              component={motion.div}
                              whileHover={{
                                scale: 1.2,
                                transition: { duration: 0.3 },
                              }}
                              style={{
                                backgroundColor: "transparent",
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        )}
                      </Grid>
                      {id !== comments.length - 1 && (
                        <Divider
                          variant="inset"
                          component="div"
                          style={{ margin: 0 }}
                        />
                      )}
                    </div>
                  ))}
                </Paper>
              </Grid>
              <Grid item style={{ marginTop: "1em" }}>
                <Paper style={{ padding: "1em" }}>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <TextField
                        label="Comment"
                        value={commentText}
                        error={commentTextError}
                        onChange={(e) => commentTextHandler(e.target.value)}
                      ></TextField>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        disabled={commentIsSending}
                        color="primary"
                        onClick={pasteCommentHandler}
                      >
                        Paste
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="like"
          onClick={likeHandler}
          disableRipple
          component={motion.div}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          style={{ backgroundColor: "transparent" }}
        >
          <Badge
            classes={{ badge: classes.customBadge }}
            className={classes.margin}
            badgeContent={likesCount.toString()}
          >
            <FavoriteIcon color={isLiked ? "secondary" : "inherit"} />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="comment"
          onClick={openCommentsHandler}
          disableRipple
          component={motion.div}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.3 },
          }}
          style={{ backgroundColor: "transparent" }}
        >
          <Badge
            classes={{ badge: classes.customBadge }}
            className={classes.margin}
            badgeContent={commentsCount.toString()}
          >
            <CommentIcon color="inherit" />
          </Badge>
        </IconButton>
        {needExpand && !loading && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            disableRipple
            style={{ backgroundColor: "transparent" }}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        {!loading && post.creator === userIdValue && (
          <IconButton
            aria-label="delete"
            onClick={deletePost}
            component={motion.div}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            style={{
              marginLeft: needExpand ? "0" : "auto",
              backgroundColor: "transparent",
            }}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {loading && (
          <img
            src={loadingPic}
            alt="loading"
            style={{ height: "5em", width: "5em", marginLeft: "auto" }}
          />
        )}
      </CardActions>
    </Card>
  );
}
