const Pin = require("../models/pin");

module.exports = {
  create: async (req, res) => {
    try {
      const pin = new Pin(req.body);

      await pin.save();
      return res.status(200).json(pin);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const pins = await Pin.find({});
      return res.status(200).json(pins);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const pin = await Pin.findById(req.params.id);
      !pin && res.status(404).json("pin not found");
      return res.status(200).json(pin);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  update: async (req, res) => {
    try {
      const savedPin = await Pin.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      !savedPin && res.status(404).json("pin not found");

      return res.status(200).json(savedPin);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: async (req, res) => {
    try {
      await Pin.findByIdAndDelete(req.params.id);
      return res.status(200).json("pin has been removed");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
