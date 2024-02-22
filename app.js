require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const UserRouter = require("./routes/User");
const WordRouter = require("./routes/Words");
const connect = require("./data/database");
const cookieParser = require("cookie-parser");
const app = express();
connect();
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/user/", UserRouter.router);
app.use("/api/data/", WordRouter.router);
app.get("/", (req, res) => {
  res.send("working");
});
app.use(morgan("combined"));
app.listen(process.env.PORT, () => {
  console.log("server is working");
});
