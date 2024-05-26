const express = require("express");
const { registerUser, loginUser } = require("../helpers/user.helper");
const { upload } = require("../config/multer.config");
const { errorMessage } = require("../enum/response-message.enum");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../middlewares/user.validator");
const router = express.Router();

router.post(
  "/signUp",
  upload.single("proPic"),
  validateRegisterUser,
  async (req, res) => {
    try {
      const user = await registerUser(req.body, req.file ? req.file.path : "");
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
);

router.post("/login", validateLoginUser, async (req, res) => {
  try {
    const user = await loginUser(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

module.exports = router;
