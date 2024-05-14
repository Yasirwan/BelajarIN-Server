const mongoose = require("mongoose");

const content3Schema = mongoose.Schema(
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

const Content3Model = mongoose.model("content3", content3Schema);

module.exports = { Content3Model };
