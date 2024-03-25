const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  fullurl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.Model("url-data", UrlSchema);
