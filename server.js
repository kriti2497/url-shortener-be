const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.post("/shorten-url", (req, res) => {
  try {
    const { fullurl } = req.body;
    if (!fullurl) {
      return res.status(400).send("Please enter url");
    }
    console.log(fullurl);
    res.status(201).send("Url created");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/kr/:shortId", (req, res) => {
  res.status(200).send(`get url request ${req.params.shortId}`);
});

app.use("*", (req, res) => {
  res.json({ msg: "Invalid Path" });
});

app.listen(PORT, () => {
  console.log("Server started successfully on port", PORT);
});
