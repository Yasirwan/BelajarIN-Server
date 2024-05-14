const express = require("express");
const router = express.Router();

//model import
const { Content3Model } = require("../models/content3.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all content data route
router.get("/all", async (req, res) => {
  try {
    const content3 = await Content3Model.find();
    res.send({ msg: "All contents data", content3 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single data route
router.get("/:content3Id", async (req, res) => {
  const { content3Id } = req.params;
  try {
    const content3 = await Content3Model.find({ _id: content3Id });
    res.send({ msg: "Single content3 data", content3: content3[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new content route
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const content3 = new Content3Model(req.body.data);
    await content3.save();
    return res.send({ msg: "Content Created", content3 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// edit content route
router.patch("/:content3Id", isAuthenticated, async (req, res) => {
  const { content3Id } = req.params;
  const payload = req.body.data;
  try {
    const content3 = await Content3Model.findByIdAndUpdate(
      { _id: content3Id },
      payload
    );
    const updatedContent3 = await Content3Model.find({ _id: content3Id });
    res
      .status(200)
      .send({ msg: "Updated Content3", content3: updatedContent3[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete content route
router.delete("/:content3Id", async (req, res) => {
  const { content3Id } = req.params;
  try {
    const content3 = await Content3Model.findByIdAndDelete({ _id: content3Id });
    res.status(200).send({ msg: "Deleted Content" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
