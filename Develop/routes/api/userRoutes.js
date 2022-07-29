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

// /api/Users
router.route('/').get(getAllUsers)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(removeUser);

// /api/users/:userId/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .put(addFriend)
  .delete(removeFriend)

module.exports = router;
