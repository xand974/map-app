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

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
