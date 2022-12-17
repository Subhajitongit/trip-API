const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./Routers/userRouter");
const tripRouter = require("./Routers/tripRouter");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.get("/", function (req, res) {
  res.json({
    msg: "Hello",
  });
});

app.use("/user", userRouter);
app.use("/trip", tripRouter);

app.listen(8080, () => {
  console.log("Server is up and running");
});
