const { Schema, model } = require("mongoose");

const UrlSchema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = model("url-link", UrlSchema);
