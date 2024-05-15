const express = require("express");
const router = express.Router();

//model import
const { Doubt3Model } = require("../models/doubt3.model");

//get all doubts data 
router.get("/all", async (req, res) => {
  try {
    const doubt3 = await Doubt3Model.find();
    res.send({ msg: "All doubts data", doubt3 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single doubt
router.get("/:doubt3Id", async (req, res) => {
  const { doubt3Id } = req.params;
  try {
    const doubt3 = await Doubt3Model.find({ _id: doubt3Id });
    res.send({ msg: "Single doubt data", doubt3: doubt3[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new doubt
router.post("/create", async (req, res) => {
  try {
    const doubt3 = new Doubt3Model(req.body);
    await doubt3.save();
    return res.send({ msg: "doubt Created", doubt3 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// add response to doubts
router.post("/add", async (req, res) => {
  try {
    const doubt3 = await Doubt3Model.findById(req.body.id);
    doubt3.response.push(req.body.desc);
    await doubt3.save();
    let updatedDoubt3 = await Doubt3Model.findById(req.body.id);
    return res.send({ msg: "Response added", doubt3: updatedDoubt3 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit doubt
router.patch("/:doubt3Id", async (req, res) => {
  const { doubt3Id } = req.params;
  const payload = req.body;
  try {
    const doubt3 = await Doubt3Model.findByIdAndUpdate({ _id: doubt3Id }, payload);
    const updatedDoubt3 = await Doubt3Model.find({ _id: doubt3Id });
    res.status(200).send({ msg: "Updated doubt", doubt3: updatedDoubt3[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete doubt
router.delete("/:doubt3Id", async (req, res) => {
  const { doubt3Id } = req.params;
  try {
    const doubt3 = await Doubt3Model.findByIdAndDelete({ _id: doubt3Id });
    res.status(200).send({ msg: "Deleted doubt" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
