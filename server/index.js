import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.js";
dotenv.config();

const app = express();

app.use(
  express.json({
    extended: true,
    limit: "30mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "30mb",
  })
);

app.use(cors());
app.use("/posts", postRoutes);
const CONNECTION_URL = process.env.DB_CONNECT;
const PORT = 8000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

mongoose.set("useFindAndModify", false);
