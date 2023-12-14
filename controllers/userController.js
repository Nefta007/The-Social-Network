const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async  getAllUsers(req, res) {
    try {
      const users= await User.find({}).populate({path: 'friends', select: '-_v'});
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select:'-__v'
      }) 
      .populate({
        path: "friends",
        select:'-__v'
      })
      .select('-_v'); 

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a course
  async deleteUserById(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User and thoughts deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addfriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: {friends: req.params.freindId} },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deletefriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        {$pull: {friends: req.params.freindId}},
        {new:true}
        );

      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
