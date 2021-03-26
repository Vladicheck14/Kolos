import User from "../models/user.js";
import bcrypt from "bcryptjs";
import validate, { result } from "../validators/validateLoginRegisterData.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const userData = req.body;
  const validateResult = validate(req.body);
  if (validateResult.status === "ERROR") {
    return res.status(409).json(validateResult);
  }
  try {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return res
        .status(409)
        .json(
          result(false, "User with this email doesn't exists", "USERNOTEXIST")
        );
    }
    const passwordCompare = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!passwordCompare) {
      return res
        .status(400)
        .json(result(false, "Invalid password", "BADPASSWORD"));
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    res.header("auth-token", token).status(200).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user._id,
      });
    } else {
      res.status(404).json(result(false, "Can't find this user", "NOUSER"));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  const userData = req.body;
  const validateResult = validate(req.body);
  if (validateResult.status === "ERROR") {
    return res.status(400).json(validateResult);
  }
  const checkEmail = await User.findOne({ email: userData.email });
  if (checkEmail) {
    return res
      .status(409)
      .json(result(false, "User with this email already exists", "USEREXISTS"));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const newUser = new User({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: hashedPassword,
    ipAddress: userData.ipAddress,
  });
  try {
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET);
    res.header("auth-token", token).status(200).send();
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
