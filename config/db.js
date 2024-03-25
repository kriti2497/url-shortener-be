const { connect } = require("mongoose");
require("dotenv").config();

function connectDB() {
  connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connected to DB", err));
}

module.exports = connectDB;
