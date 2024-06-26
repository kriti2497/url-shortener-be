const nano = require("nanoid");
const UrlSchema = require("../models/url.model");
require("dotenv").config();
async function createUrl(req, res) {
  let regex =
    /^(?:http|https?):\/\/(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}|(?:\d{1,3}\.){3}\d{1,3})(?::\d+)?(?:\/\S*)?$/i;
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      return res.status(400).send("Please enter url");
    }
    if (!regex.test(fullUrl)) {
      return res
        .status(400)
        .send("Please enter valid url ex: https://www.example.com");
    }

    const urlExists = await UrlSchema.findOne({ fullUrl: fullUrl });

    if (urlExists) {
      return res.status(201).json({
        msg: "Url created",
        shortUrl: process.env.DOMAIN + urlExists.shortUrl,
      });
    }

    const shortUrl = nano.nanoid(7);
    const obj = {
      fullUrl,
      shortUrl,
      clicks: 0,
    };

    await UrlSchema.create(obj);

    res
      .status(201)
      .json({ msg: "Url created", shortUrl: process.env.DOMAIN + shortUrl });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

async function getfullUrl(req, res) {
  try {
    const { shortId } = req.params;
    const urlData = await UrlSchema.findOne({
      shortUrl: shortId,
    });

    if (!urlData) return res.status(404).send("Url not found");
    urlData.clicks++;
    await urlData.save();
    res.redirect(urlData.fullUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
}

exports.createUrl = createUrl;
exports.getfullUrl = getfullUrl;
