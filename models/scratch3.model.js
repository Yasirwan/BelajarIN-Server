const mongoose = require("mongoose");

const scratch3Schema = mongoose.Schema(
  {
    title: String,
    thumbnail: {
      type: String,
      default: "https://akm-img-a-in.tosshub.com/aajtak/3033-03/quiz_01.png",
    },
    class: Number,
    subject: String,
    creator: String,
    noOfQuestions: Number,
    pointPerQuestion: Number,
    negativeMarking: { type: String, default: "No" },
    negativeMarkingPerQuestion: { type: String, default: "No" },
    totalTime: String,
    questionData: Array,
    totalPoint: Number,
    totalTime: Number,
  },
  { versionKey: false, timestamps: true }
);

const Scratch3Model = mongoose.model("scratch3", scratch3Schema);

module.exports = { Scratch3Model };
