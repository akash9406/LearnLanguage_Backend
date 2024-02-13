const mongoose = require("mongoose");
const { Schema } = mongoose;

const wordSchema = new Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hi: Number,
  ja: Number,
  fr: Number,
  es: Number,
});

exports.words = mongoose.model("words", wordSchema);
