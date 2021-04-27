const { Schema, model } = require("mongoose");

const DEFAULT_FILENAME = "Untitled document";

const Document = new Schema({
  _id: String,
  data: Object,
  filename: {
    type: String,
    default: DEFAULT_FILENAME,
  },
});

module.exports = model("Document", Document);
