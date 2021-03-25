import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  ipAddress: String,
});

const User = mongoose.model("User", userSchema);

export default User;
