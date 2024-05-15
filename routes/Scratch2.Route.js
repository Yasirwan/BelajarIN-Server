const express = require("express");
const router = express.Router();

//model import
const { Scratch2Model } = require("../models/scratch2.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all scratch data
router.get("/all", async (req, res) => {
  try {
    const scratchs2 = await Scratch2Model.find();
    res.send({ msg: "All scratchs2 data", scratchs2 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single scratch
router.get("/:scratch2Id", async (req, res) => {
  const { scratch2Id } = req.params;
  try {
    const scratch2 = await Scratch2Model.find({ _id: scratch2Id });
    res.send({ msg: "Single scratch2 data", scratch2: scratch2[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new scratch
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const scratch2 = new Scratch2Model(req.body.data);
    await scratch2.save();
    return res.send({ msg: "Scratch2 Created", scratch2 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// add response to scratchs2
router.post("/add", async (req, res) => {
  try {
    const scratch2 = await Scratch2Model.findById(req.body.id);
    scratch2.response.push(req.body.desc);
    await scratch2.save();
    let updatedScratch2 = await Scratch2Model.findById(req.body.id);
    return res.send({ msg: "Response added", scratch2: updatedScratch2 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit scratch
router.patch("/:scratch2Id", isAuthenticated, async (req, res) => {
  const { scratch2Id } = req.params;
  const payload = req.body.data;
  try {
    const scratch2 = await Scratch2Model.findByIdAndUpdate({ _id: scratch2Id }, payload);
    const updatedScratch2 = await Scratch2Model.find({ _id: scratch2Id });
    res.status(200).send({ msg: "Updated Scratch2", scratch2: updatedScratch2[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete scratch
router.delete("/:scratch2Id", async (req, res) => {
  const { scratch2Id } = req.params;
  try {
    const scratch2 = await Scratch2Model.findByIdAndDelete({ _id: scratch2Id });
    res.status(200).send({ msg: "Deleted Scratch2" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
