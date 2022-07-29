const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((allThoughtsData) => res.json(allThoughtsData))
      .catch((err) => res.status(500).json(err));
  },

  // Get a thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { runValidators: true, new: true }
        );
      })
      .then(thoughtData => {
        !thoughtData
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thoughtData)
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  },

  // Update a thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { runValidators: true, new: true }
    )
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then((thoughtData) => {
        !thoughtData
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thoughtData);
        return thoughtData;
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        console.log(dbThoughtData)
        return !dbThoughtData
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },


  // Add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { runValidators: true, new: true })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(thoughtData => {
        return !thoughtData
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(thoughtData)
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true })
      .then(thoughtData => {
        return !thoughtData
          ? res.status(404).json({ message: 'No reaction with that ID' })
          : res.json(thoughtData)
      })
      .catch((err) => res.status(500).json(err));
  }
};
