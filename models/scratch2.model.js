const mongoose = require("mongoose");

const scratch2Schema = mongoose.Schema(
  {
    title: String,
    thumbnail: {
      type: String,
      default: "https://akm-img-a-in.tosshub.com/aajtak/2023-02/quiz_01.png",
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

const Scratch2Model = mongoose.model("scratch2", scratch2Schema);

module.exports = { Scratch2Model };
