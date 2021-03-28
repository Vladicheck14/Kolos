import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
    await newPost.save();
    res.status(201).json(newPost);
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

export const likePost = async (req, res) => {
  const id = req.body.id;
  const action = req.body.like;
  if (action === "add") {
    try {
      PostMessage.findById(id, (err, post) => {
        if (post.likedUsers.includes(req.user._id)) {
          return res
            .status(409)
            .json({ message: "you already liked this post" });
        }
        post.likedUsers.push(req.user._id);
        post.save((err, updatedpost) => {
          res.status(200).json({ likes: updatedpost.likedUsers.length });
        });
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else if (action === "remove") {
    try {
      PostMessage.findById(id, (err, post) => {
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
