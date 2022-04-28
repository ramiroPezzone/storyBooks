const mongoose = require("mongoose");

const date = new Date().toLocaleString();

const StorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  body: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "public",
    enum: ["public", "private"],
  },
  user: {
    type: String,
  },
  createAdAt: {
    type: String,
    default: date,
  },
});

module.exports = mongoose.model("Story", StorySchema);
