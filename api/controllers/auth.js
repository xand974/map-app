const User = require("$models/user");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");

module.exports = {
  register: async (req, res) => {
    const { username, password, city } = req.body;
    try {
      const user = await User.findOne({ username: req.body.username });
      user && res.status(401).json("user already exist");

      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: pass,
        city,
      });

      await newUser.save();

      return res.status(200).json(newUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      !user && res.status(404).json("user not found");
      const isCorrect = await bcrypt.compare(password, user.password);

      if (isCorrect) {
        const token = generateToken(user);
        const { password, ...rest } = user._doc;
        res.status(200).json({ user: rest, accessToken: token });
      } else {
        res.status(403).json("username or password incorrect");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
