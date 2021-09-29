require("dotenv").config();
require("sexy-require");
require("$config/db.config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRouter = require("$routes/auth");
const pinRouter = require("$routes/pin");
const userRouter = require("$routes/user");

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/pins", pinRouter);
app.use("/api/v1/users", userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
