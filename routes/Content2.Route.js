const express = require("express");
const router = express.Router();

//model import
const { Content2Model } = require("../models/content2.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all content data route
router.get("/all", async (req, res) => {
  try {
    const content2 = await Content2Model.find();
    res.send({ msg: "All contents data", content2 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single data route
router.get("/:content2Id", async (req, res) => {
  const { content2Id } = req.params;
  try {
    const content2 = await Content2Model.find({ _id: content2Id });
    res.send({ msg: "Single content2 data", content2: content2[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new content route
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const content2 = new Content2Model(req.body.data);
    await content2.save();
    return res.send({ msg: "Content Created", content2 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// edit content route
router.patch("/:content2Id", isAuthenticated, async (req, res) => {
  const { content2Id } = req.params;
  const payload = req.body.data;
  try {
    const content2 = await Content2Model.findByIdAndUpdate(
      { _id: content2Id },
      payload
    );
    const updatedContent2 = await Content2Model.find({ _id: content2Id });
    res
      .status(200)
      .send({ msg: "Updated Content2", content2: updatedContent2[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete content route
router.delete("/:content2Id", async (req, res) => {
  const { content2Id } = req.params;
  try {
    const content2 = await Content2Model.findByIdAndDelete({ _id: content2Id });
    res.status(200).send({ msg: "Deleted Content" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
