const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// /api/Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought);

// /api/Thoughts/:ThoughtId/Reactions
router.route('/:ThoughtId/reactions').post(addReaction);

// /api/Thoughts/:ThoughtId/Reactions/:ReactionId
router.route('/:ThoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
