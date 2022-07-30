const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  removeUser,
  removeFriend
} = require('../../controllers/user-controller');

// localhost:3001/api/Users
router.route('/').get(getAllUsers)
  .post(createUser);

// localhost:3001/api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser);

// localhost:3001/api/users/:userId/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .put(addFriend)
  .delete(removeFriend)

module.exports = router;
