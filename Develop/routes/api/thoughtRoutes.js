const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thought-controller');

// localhost:3001/api/thoughts
router.route('/').get(getAllThoughts);

// localhost:3001/api/thoughts/:id
router.route('/:id').get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// localhost:3001/api/thoughts/:userId
router.route('/:userId')
  .post(createThought);

// localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// localhost:3001/api/thoughts/:thoughtId/reactions/reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);
  
module.exports = router;
