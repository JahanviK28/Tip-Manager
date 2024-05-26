const { Schema, model } = require("mongoose");

const tipSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    place: { type: String },
    totalAmount: { type: Number },
    tipPercentage: { type: Number },
    tipAmount: { type: Number },
  },
  { timestamps: true }
);

module.exports = model("tip", tipSchema);
