const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.headers.token;

    if (token) {
      jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, payload) => {
        if (err) {
          return res.status(403).json("token is not valid");
        } else {
          req.user = payload;
          next();
        }
      });
    } else {
      return res.status(401).json("you are not authentificated");
    }
  },
  verifyAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(401)
        .json("you are not allowed to do this task [not admin]");
    }
  },
  verifyUserOrAdmin: (req, res, next) => {
    if (
      req.user._id === req.params.id ||
      req.user.isAdmin ||
      req.user._id === req.body.userId
    ) {
      next();
    } else {
      return res.status(401).json("you are not allowed to do this task");
    }
  },
};
