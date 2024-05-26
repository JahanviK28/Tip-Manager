const Tip = require("../models/tip.model");
const { logger } = require("../config/logger.config");
const moment = require("moment");
const { errorMessage } = require("../enum/response-message.enum");

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
    logger.error(errorMessage.TIP_CREATION_FAILURE, { error: error.message });
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
    const startingDate = startDate
      ? moment(startDate, "DD-MM-YYYY").toDate()
      : new Date();
    const endingDate = endDate
      ? moment(endDate, "DD-MM-YYYY").toDate()
      : new Date();
    const tips = await Tip.find(
      {
        user: userId,
        $and: [
          { createdAt: { $gte: startingDate } },
          { createdAt: { $lte: endingDate } },
        ],
      },
      { place: 1, totalAmount: 1, tipAmount: 1, _id: 0 }
    );
    return tips;
  } catch (error) {
    logger.error(errorMessage.TIP_FETCHING_FAILURE, {
      error: error.message,
    });
    throw new Error(error);
  }
}

module.exports = { createTip, getTips };
