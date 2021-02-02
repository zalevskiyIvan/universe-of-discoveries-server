const express = require("express");
// const mongodb = require('mongodb')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const config = require("config");
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", router);

const port = process.env.PORT || config.get("port");

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ivan:ivanZalevskiy1@cluster0.mpokw.mongodb.net/universe?retryWrites=true&w=majority",

      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    );
  } catch (e) {
    console.log("MONGO_ERROR:", e);
  }
};
app.use("/", (req, res) => {
  res.send("поздравляю");
});
app.listen(port, (err) => {
  if (err) return console.log(err);
  console.log("server has been started on port", port);
});

start();
