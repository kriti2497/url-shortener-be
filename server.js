const express = require("express");
const { createUrl, getfullUrl } = require("./controller/urlController");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3001;

connectDB();
app.use(express.json());

app.post("/shorten-url", createUrl);

app.get("/kr/:shortId", getfullUrl);

app.use("*", (req, res) => {
  res.json({ msg: "Invalid Path" });
});

app.listen(PORT, () => {
  console.log("Server started successfully on port", PORT);
});
