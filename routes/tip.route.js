const express = require("express");
const { createTip, getTips } = require("../helpers/tip.helper");
const { authenticate } = require("../middlewares/auth.middleware");
const {
  validateCreateTip,
  validateGetTips,
} = require("../middlewares/tip.validator");
const router = express.Router();

router.post("/calculate", authenticate, validateCreateTip, async (req, res) => {
  try {
    const tip = await createTip(req.user._id, req.body);
    return res.status(200).json(tip);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.get("/", authenticate, validateGetTips, async (req, res) => {
  try {
    const tips = await getTips(
      req.user._id,
      req?.query?.startDate,
      req?.query?.endDate
    );
    return res.status(200).json(tips);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
