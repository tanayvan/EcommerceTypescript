const express = require("express");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "Name Should be Atleast 3 Character").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password Should be Atleast 3 Character").isLength({
      min: 3,
    }),
  ],
  signup
);
router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password not big enough").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

module.exports = router;
