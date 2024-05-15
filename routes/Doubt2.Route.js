const express = require("express");
const router = express.Router();

//model import
const { Doubt2Model } = require("../models/doubt2.model");

//get all doubts data 
router.get("/all", async (req, res) => {
  try {
    const doubt2 = await Doubt2Model.find();
    res.send({ msg: "All doubts data", doubt2 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single doubt
router.get("/:doubt2Id", async (req, res) => {
  const { doubt2Id } = req.params;
  try {
    const doubt2 = await Doubt2Model.find({ _id: doubt2Id });
    res.send({ msg: "Single doubt data", doubt2: doubt2[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new doubt
router.post("/create", async (req, res) => {
  try {
    const doubt2 = new Doubt2Model(req.body);
    await doubt2.save();
    return res.send({ msg: "doubt Created", doubt2 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// add response to doubts
router.post("/add", async (req, res) => {
  try {
    const doubt2 = await Doubt2Model.findById(req.body.id);
    doubt2.response.push(req.body.desc);
    await doubt2.save();
    let updatedDoubt2 = await Doubt2Model.findById(req.body.id);
    return res.send({ msg: "Response added", doubt2: updatedDoubt2 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit doubt
router.patch("/:doubt2Id", async (req, res) => {
  const { doubt2Id } = req.params;
  const payload = req.body;
  try {
    const doubt2 = await Doubt2Model.findByIdAndUpdate({ _id: doubt2Id }, payload);
    const updatedDoubt2 = await Doubt2Model.find({ _id: doubt2Id });
    res.status(200).send({ msg: "Updated doubt", doubt2: updatedDoubt2[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete doubt
router.delete("/:doubt2Id", async (req, res) => {
  const { doubt2Id } = req.params;
  try {
    const doubt2 = await Doubt2Model.findByIdAndDelete({ _id: doubt2Id });
    res.status(200).send({ msg: "Deleted doubt" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
