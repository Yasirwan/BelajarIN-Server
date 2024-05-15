const mongoose = require("mongoose");

const doubt3Schema = mongoose.Schema(
  {
    studentId: String,
    name: String,
    title: String,
    description: String,
    class: Number,
    subject: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
    resolved: { type: String, default: "No" },
    response: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

const Doubt3Model = mongoose.model("doubt3", doubt3Schema);

module.exports = { Doubt3Model };
