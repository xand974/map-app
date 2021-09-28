module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(401).json("you are not allowed to do this task");
    }
  },
};
