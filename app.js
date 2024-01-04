import mongoose from "mongoose";
import express from "express";
import Post from "./models/post.models.js";
const app = express();

app.use(express.json());
mongoose.connect("connection string");

const db = mongoose.connection;
db.on("connected", () => {
  console.log("DB Connected Succesfully!!");
});
db.on("error", () => {
  console.log("Error in connecting DB!!");
});
db.once("open", async () => {
  if ((await Post.countDocuments().exec()) > 0) return;
  Promise.all([
    Post.create({ title: "Post One", content: "Content of Post One" }),
    Post.create({ title: "Post Two", content: "Content of Post Two" }),
    Post.create({ title: "Post Three", content: "Content of Post Three" }),
    Post.create({ title: "Post Four", content: "Content of Post Four" }),
    Post.create({ title: "Post Five", content: "Content of Post Five" }),
    Post.create({ title: "Post Six", content: "Content of Post Six" }),
    Post.create({ title: "Post Seven", content: "Content of Post Seven" }),
    Post.create({ title: "Post Eight", content: "Content of Post Eight" }),
    Post.create({ title: "Post Nine", content: "Content of Post Nine" }),
    Post.create({ title: "Post Ten", content: "Content of Post Ten" }),
    Post.create({ title: "Post Eleven", content: "Content of Post Eleven" }),
    Post.create({ title: "Post Twelve", content: "Content of Post Twelve" }),
  ])
    .then(() => {
      console.log("Posts Added Succesfully!!");
    })
    .catch((err) => {
      console.log(err.message || err);
    });
});
const paginatedResultFun = (Model) => {
  return async (req, res, next) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const startedIndex = (page - 1) * limit;
      const endindex = page * limit;
      const results = {};
      if (endindex < (await Post.countDocuments().exec())) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }
      if (startedIndex > 0) {
        results.prev = {
          page: page - 1,
          limit: limit,
        };
      }

      results.result = await Model.find()
        .limit(limit)
        .skip(startedIndex)
        .exec();

      res.paginatedResult = results;
      next();
    } catch (error) {
      console.log(error.message || error);
    }
  };
};
app.get("/post", paginatedResultFun(Post), (req, res) => {
  res.json({ result: res.paginatedResult });
});
app.get("/", (req, res) => {
  res.send({ msg: "Server Running Succesfully" });
});

app.listen(5000, () => {
  console.log(`Server Running at : http://localhost:500`);
});
