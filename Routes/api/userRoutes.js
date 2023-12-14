const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
  addfriend,
  deletefriend
} = require('../../controllers/userController.js');

router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

router
  .route('/:Id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUserById);

router
  .route('/:userId/friends/:friendId')
  .post(addfriend)
  .delete(deletefriend);

module.exports = router;