const express = require('express');

// Importing the controller functions.
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
  addProductToUser,
  getProductsPurchasedByUser,
} = require('../controllers/userControllers');

//Import the required middlware here.
const { grantAccessTo } = require('../middlewares/grantAccessTo');

const router = express.Router();

router.patch('/add-product', addProductToUser);
router.get('/products-purchased/', getProductsPurchasedByUser);

// Public Routes
router.post('/', grantAccessTo(['guest', 'admin', 'superadmin']), createUser);
router.get('/:id', grantAccessTo(['user', 'admin', 'superadmin']), getUserByID);
router.patch(
  '/:id',
  grantAccessTo(['user', 'admin', 'superadmin']),
  updateUser
);

//Admin Only Routes
router.get('/', /*grantAccessTo(['admin', 'superadmin']),*/ getAllUsers);
router.delete('/:id', grantAccessTo(['superadmin']), deleteUser);

module.exports = router;
