import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const messages = await PostMessage.find();
    console.log("request from client");
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const id = req.body.id;
  await PostMessage.findByIdAndRemove(id);

  try {
    res.status(200).json({ message: "deleted" });
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
        post.likesCount++;
        post.save((err, updatedpost) => {
          res.status(200).json({ likes: updatedpost.likesCount });
        });
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  } else if (action === "remove") {
    try {
      PostMessage.findById(id, (err, post) => {
        post.likesCount--;
        post.save((err, updatedpost) => {
          res.status(200).json({ likes: updatedpost.likesCount });
        });
      });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
};
