const router = require('express').Router();
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/user-controller');

// /api/Users
router.route('/').get(getAllUser).post(createUser);

// /api/Users/:UserId
router
  .route('/:UserId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
