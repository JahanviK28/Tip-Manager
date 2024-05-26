const Tip = require("../models/tip.model");
const { logger } = require("../config/logger.config");

/**
 * Helper function to create tip for user
 * @param userId - user id to create tip for user
 * @param data - details of the tip
 */
async function createTip(userId, data) {
  try {
    const { place, totalAmount, tipPercentage } = data;

    const tipAmount = Math.round((totalAmount * tipPercentage) / 100);
    const tip = new Tip({
      user: userId,
      place,
      totalAmount,
      tipAmount,
      tipPercentage,
    });

    await tip.save();
    return { tip: tip.tipAmount };
  } catch (error) {
    logger.error("Error in creating a tip", { error: error.message });
    throw new Error(error);
  }
}

/**
 * Helper function to get tip infor for the user witht the given start and end date
 * @param userId - user id to get tips
 * @param startDate - start date to get tip
 * @param endDate - end date to get tip
 */
async function getTips(userId, startDate, endDate) {
  try {
    const tips = await Tip.find({ user: userId });
    return tips;
  } catch (error) {
    logger.error("Error in getting tips for the user", {
      error: error.message,
    });
    throw new Error(error);
  }
}

module.exports = { createTip, getTips };
