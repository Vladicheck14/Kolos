import { React, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Badge from "@material-ui/core/Badge";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./style";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import clsx from "clsx";

export default function Post({ post, posts, setPosts }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);
  const [expanded, setExpanded] = useState(false);
  const needExpand = post.message.length > 46;
  useEffect(() => {
    if (
      localStorage.getItem(post._id) !== null &&
      localStorage.getItem(post._id) !== undefined
    ) {
      setIsLiked(true);
    }
  }, [post._id]);

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
    axios
      .post("http://localhost:8000/posts/delete", { id: post._id })
      .then((response) => {
        if (response.status === 200) {
          setPosts(posts.filter((item) => item._id !== post._id));
        }
      })
      .catch((error) => console.log(error));
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const likeHandler = () => {
    if (!isLiked) {
      localStorage.setItem(post._id, "like");
      axios
        .post("http://localhost:8000/posts/like", { id: post._id, like: "add" })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setLikesCount(response.data.likes);
          }
        })
        .catch((error) => console.log(error));
    } else {
      localStorage.removeItem(post._id);
      axios
        .post("http://localhost:8000/posts/like", {
          id: post._id,
          like: "remove",
        })
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
    <Card className={classes.root}>
      <CardHeader
        title={post.title}
        subheader={date.toLocaleDateString("en-US", dateOptions)}
        avatar={
          <Avatar aria-label="avatar" className={classes.avatar}>
            {post.creator.charAt(0).toUpperCase()}
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
          style={{ wordWrap: "break-word" }}
        >
          {!expanded &&
            (needExpand ? `${post.message.substring(0, 43)}...` : post.message)}
          {expanded && post.message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={likeHandler}>
          <Badge
            classes={{ badge: classes.customBadge }}
            className={classes.margin}
            badgeContent={likesCount.toString()}
          >
            <FavoriteIcon color={isLiked ? "secondary" : "inherit"} />
          </Badge>
        </IconButton>
        {needExpand && (
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            disableRipple
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        <IconButton
          aria-label="delete"
          onClick={deletePost}
          style={{ marginLeft: needExpand ? "0" : "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
