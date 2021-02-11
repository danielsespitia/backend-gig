const Message = require("../models/message.model");
const User = require("../models/user.model");

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findById(req.user);

      const { readerId } = req.params;
      const reader = await User.findById(readerId);

      if (!user) {
        throw new Error("Invalid User");
      }

      if (!reader) {
        throw new Error("Invalid Recipient");
      }

      const message = await Message.create({
        ...req.body,
        sender: user._id,
        reader: reader._id,
      });

      user.messages.push(message._id);
      await user.save({ validateBeforeSave: false });

      reader.messages.push(message._id);
      await reader.save({ validateBeforeSave: false });

      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: error.message });
      console.log(error);
    }
  },

  async list(req, res) {
    try {
      const user = await User.findById(req.user);
      const messages = await Message.find();

      if (!user) {
        throw new Error("Invalid User");
      }

      if (!messages) {
        throw new Error("Message list not found");
      }

      res.status(200).json({ message: "Message list found", data: messages });
    } catch (error) {
      res.status(404).json({ message: "Messages not found" });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.user);

      if (!user) {
        throw new Error("Invalid User");
      }

      const { messageId } = req.params;

      const message = await Message.findById(messageId).populate({
        path: "reader",
        select: "name",
      });

      res.status(200).json(message);
    } catch (error) {
      res.states(400).json({ message: "Message not found" });
    }
  },
};
