const mongoose = require("mongoose");

const doubt2Schema = mongoose.Schema(
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

const Doubt2Model = mongoose.model("doubt2", doubt2Schema);

module.exports = { Doubt2Model };
