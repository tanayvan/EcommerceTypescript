const User = require("../models/user");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      field: errors.array()[0].param,
    });
  }

  User.findOne({ email: req.body.email }).exec((err, doc) => {
    console.log();
    if (doc !== null) {
      console.log(doc);
      return res.status(400).json({
        error: "Email Already Exists",
      });
    } else {
      const user = new User(req.body);

      user.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: "error Signing Up Data",
          });
        }

        res.json({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      field: errors.array()[0].param,
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user does not exists",
        field: "email",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "email and password do not match",
        field: "password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    // put token in cookie
    res.cookie("token", token, { expire: new Date() + 100 });
    //send response to frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Sign Out Successfully",
  });
};

//protected routes

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};
exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "You are not admin, Access Denied",
    });
  }
  next();
};
