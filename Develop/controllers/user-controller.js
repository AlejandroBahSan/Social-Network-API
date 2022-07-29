const { User, Thought } = require("../models");


module.exports = {
  // Get all students
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Get an user
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(userData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Create an user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.json(err));
  },

  // Update an user
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // Delete an user
  removeUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(userData => {
        return !userData
          ? res.status(404).json({ message: "No user with this id!" })
          // $in finds specific searchs
          : Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: `User id ${params.id} and associated thoughts deleted!` });
      })
      .catch((err) => res.json(err));
  },

  // Add a friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true })
      .populate({ path: 'friends', select: ('-__v') })
      .select('-__v')
      .then(userData => {
        console.log(userData);
        return !userData
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(userData);
      })
      .catch((err) => res.json(err));
  },

  // Delete a friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true })
      .populate({ path: 'friends', select: '-__v' })
      .select('-__v')
      .then(userData => {
        return !userData
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(userData);
      })
      .catch((err) => res.json(err));
  },
};
