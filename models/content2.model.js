const mongoose = require("mongoose");

const content2Schema = mongoose.Schema(
  {
    title: String,
    class: String,
    subject: String,
    type: String,
    creator: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
  },
  { versionKey: false, timestamps: true }
);

const Content2Model = mongoose.model("content2", content2Schema);

module.exports = { Content2Model };
