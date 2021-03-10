const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router/router");
const cookieParser = require("cookie-parser");
const config = require("config");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: config.get("origin"), // fix to deploy version
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser("123"));

app.use(bodyParser.json());

app.use("/api", router);

const port = process.env.PORT || config.get("port");

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ivan:ivanZalevskiy1@cluster0.mpokw.mongodb.net/universe?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
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
