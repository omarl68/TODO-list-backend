const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const {
  signup,
  login,
  resetPassword,
  forgetPassword,
} = require("./schemas/userSchemas");
const { schemaValidator } = require("../middlewares/schemaValidator");

router.post("/signup", schemaValidator(signup), authController.signup);
router.post("/login", schemaValidator(login), authController.login);

router.post(
  "/forgotpassword",
  schemaValidator(forgetPassword),
  authController.forgotPassword
);
router.patch(
  "/resetpassword/:token",
  schemaValidator(resetPassword),
  authController.resetPassword
);
module.exports = router;