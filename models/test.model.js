const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    title: String,
    class: String,
    creator: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
  },
  { versionKey: false, timestamps: true }
);

const TestModel = mongoose.model("test", testSchema);

module.exports = { TestModel };