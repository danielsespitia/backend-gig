const User = require('../models/user.model');
const Message = require('../models/message.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports = {
  async signup(req, res) {
    try {
      const { name, email, password, terms } = req.body;
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        name,
        email,
        password: encPassword,
        terms,
      });

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Usuario o contraseña invalida');
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        throw new Error('Usuario o contraseña invalida');
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET, {
        expiresIn: 60 * 60 * 24,
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  async list(req, res) {
    try {
      const users = await User.find();

      if (!users) {
        throw new Error('User list not found');
      }

      res.status(200).json({ message: 'Users list found', data: users });
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async show(req, res) {
    try {
      const user = await User.findById(req.user);

      if (!user) {
        throw new Error('User not found');
      }

      res.status(200).json({ message: 'User found', data: user });
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  },

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.user, req.body, {
        new: true,
        useFindAndModify: false,
      });

      if (!user) {
        throw new Error('Could not update that user');
      }

      res.status(200).json({ message: 'User updated', data: user });
    } catch (error) {
      res.status(400).json({ message: 'User could not be updated' });
    }
  },

  async updateProfilePicture(req, res) {
    try {
      const {
        file: { secure_url },
      } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user,
        { profilePicture: secure_url },
        { new: true, useFindAndModify: false }
      );

      if (!user) {
        throw new Error('Could not upload that Profile Picture');
      }

      res.status(200).json({ message: 'Profile picture updated', data: user });
    } catch (error) {
      res.status(400).json({ message: 'Profile picture could not be updated' });
    }
  },

  async destroy(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.user);

      if (!user) {
        throw new Error('Could not delete user');
      }
      res.status(200).json({ message: 'User deleted', data: user });
    } catch (err) {
      res.status(400).json({ message: 'User could not be deleted' });
    }
  },

  async showReceivedMessages(req, res) {
    const messages = await Message.find({
      reader: mongoose.Types.ObjectId(req.user),
    }).populate('sender', '_id name profilePicture');

    res.status(200).json({ message: 'Messages found', data: messages });
  },
};
