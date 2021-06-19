const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/Cart");
const { isAuthenticated, isSignedIn } = require("../controllers/Auth");
const { getUserById } = require("../controllers/user");

const router = express.Router();

router.param("userId", getUserById);

router.post("/addtocart/:userId", isSignedIn, isAuthenticated, addToCart);
router.post(
  "/updatequantity/:userId",
  isSignedIn,
  isAuthenticated,
  updateQuantity
);
router.delete(
  "/removefromcart/:productid/:userId",
  isSignedIn,
  isAuthenticated,
  removeFromCart
);
router.get("/getcart/:userId", isSignedIn, isAuthenticated, getCart);

module.exports = router;
