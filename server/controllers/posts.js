import PostMessage from "../models/postMessage.js";
import Comment from "../models/comment.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
  let posts = [];
  posts = await PostMessage.find();
  if (req.query && Object.keys(req.query).length === 0) {
    try {
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  } else {
    try {
      if (req.query.withLikes === "true") {
        let newPosts = posts.filter((post) => post.likedUsers.length > 0);
        if (req.query.withComments === "true") {
          newPosts = posts.filter(
            (post) => post.likedUsers.length > 0 && post.comments.length > 0
          );
          if (req.query.commentor !== "") {
            newPosts = newPosts.filter((post) =>
              post.comments.find((comment) =>
                comment.userName
                  .toLowerCase()
                  .includes(req.query.commentor.toLowerCase())
              )
            );
          }
        }
        return res.status(200).json(newPosts);
      }
      if (req.query.withComments === "true") {
        let newPosts = posts.filter((post) => post.comments.length > 0);
        if (req.query.commentor !== "") {
          newPosts = newPosts.filter((post) =>
            post.comments.find((comment) =>
              comment.userName
                .toLowerCase()
                .includes(req.query.commentor.toLowerCase())
            )
          );
        }
        return res.status(200).json(newPosts);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const postCreator = await User.findById(req.user._id);
  const newPost = new PostMessage({
    ...post,
    creator: postCreator._id,
    creatorName: postCreator.firstName,
  });
  try {
    await newPost.save((err, savedPost) => {
      if (err) {
        return res.status(409).json({ message: err.message });
      }
      return res.status(201).json(savedPost);
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const id = req.body.id;
  try {
    const post = await PostMessage.findById(id);
    if (post) {
      if (post.creator === req.user._id) {
        await PostMessage.findByIdAndRemove(id);
        res.status(200).json({ message: "deleted" });
      } else {
        res.status(409).json({ message: "you can't delete other's posts" });
      }
    } else {
      res.status(409).json({ message: "can't find post" });
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  const postID = req.body.postId;
  const commentText = req.body.commentText;
  if (!postID) {
    return res.status(400).json({ message: "you must specify post id" });
  }
  if (!commentText) {
    return res.status(400).json({ message: "you must specify comment text" });
  }
  try {
    await PostMessage.findById(postID, (err, post) => {
      if (err) {
        return res.status(409).json({ message: err.message });
      }
      User.findById(req.user._id, (err, user) => {
        if (err) {
          return res.status(409).json({ message: err.message });
        }
        post.comments.push(
          new Comment({
            userID: req.user._id,
            userName: `${user.firstName} ${user.lastName}`,
            commentText,
          })
        );
        post.save((err, savedPost) => {
          if (err) {
            return res.status(409).json({ message: err.message });
          }
          res.status(200).json({
            message: "post added",
            comments: savedPost.comments,
            postId: savedPost._id.toString(),
          });
        });
      });
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const removeComment = async (req, res) => {
  const commentID = req.body.commentId;
  const postID = req.body.postId;
  if (!commentID) {
    return res.status(400).json({ message: "you must specify comment id" });
  }
  if (!postID) {
    return res.status(400).json({ message: "you must specify post id" });
  }
  try {
    await PostMessage.findById(postID, (err, post) => {
      if (err) {
        return res.status(409).json({ message: err.message });
      }
      const comment = post.comments.find(
        (comment) => comment._id.toString() === commentID
      );
      if (!comment) {
        return res
          .status(409)
          .json({ message: "Comment with this id don't exist" });
      }
      if (comment.userID !== req.user._id) {
        return res
          .status(409)
          .json({ message: "You can't delete comments you do not own" });
      }
      const newPostComments = post.comments.filter(
        (comment) => comment._id.toString() !== commentID
      );
      post.comments = newPostComments;
      post.save((err, savedPost) => {
        if (err) {
          return res.status(409).json({ message: err.message });
        }
        return res
          .status(200)
          .json({ message: "post removed", comments: savedPost.comments });
      });
    });
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const id = req.body.id;
  const action = req.body.like;
  if (action === "add") {
    try {
      await PostMessage.findById(id, (err, post) => {
        if (err) {
          return res.status(409).json({ message: err.message });
        }
        if (post.likedUsers.includes(req.user._id)) {
          return res
            .status(409)
            .json({ message: "you already liked this post" });
        }
        post.likedUsers.push(req.user._id);
        post.save((err, updatedpost) => {
          if (err) {
            return res.status(409).json({ message: err.message });
          }
          res.status(200).json({ likes: updatedpost.likedUsers.length });
        });
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else if (action === "remove") {
    try {
      await PostMessage.findById(id, (err, post) => {
        if (err) {
          return res.status(409).json({ message: err.message });
        }
        if (!post.likedUsers.includes(req.user._id)) {
          return res
            .status(409)
            .json({ message: "you did not liked this post" });
        }
        const newLikedUsers = post.likedUsers.filter(
          (user) => user !== req.user._id
        );
        post.likedUsers = newLikedUsers;
        post.save((err, updatedpost) => {
          res.status(200).json({ likes: updatedpost.likedUsers.length });
        });
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
