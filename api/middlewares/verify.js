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
};
