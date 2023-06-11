var express = require("express");
const { check, validationResult } = require("express-validator");
const { signout, signup,signin,isSignedIn } = require("../controllers/auth.js");

var router = express.Router();

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 5 })
      .withMessage("name must be atleast 5 chars long"),
    check("email","must be email").isEmail(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password be atleast 5 character long"),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email","Email is required").isEmail(),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password field is required"),
  ],
  signin
);

router.get("/signout", signout);
router.get("/signtest", isSignedIn, (req,res) =>{
  res.json(req.auth);
} );

module.exports = router;
