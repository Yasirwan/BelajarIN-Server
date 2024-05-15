const express = require("express");
const router = express.Router();

//model import
const { Scratch3Model } = require("../models/scratch3.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all scratch data
router.get("/all", async (req, res) => {
  try {
    const scratchs3 = await Scratch3Model.find();
    res.send({ msg: "All scratchs3 data", scratchs3 });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single scratch
router.get("/:scratch3Id", async (req, res) => {
  const { scratch3Id } = req.params;
  try {
    const scratch3 = await Scratch3Model.find({ _id: scratch3Id });
    res.send({ msg: "Single scratch3 data", scratch3: scratch3[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new scratch
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const scratch3 = new Scratch3Model(req.body.data);
    await scratch3.save();
    return res.send({ msg: "Scratch3 Created", scratch3 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// add response to scratchs3
router.post("/add", async (req, res) => {
  try {
    const scratch3 = await Scratch3Model.findById(req.body.id);
    scratch3.response.push(req.body.desc);
    await scratch3.save();
    let updatedScratch3 = await Scratch3Model.findById(req.body.id);
    return res.send({ msg: "Response added", scratch3: updatedScratch3 });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit scratch
router.patch("/:scratch3Id", isAuthenticated, async (req, res) => {
  const { scratch3Id } = req.params;
  const payload = req.body.data;
  try {
    const scratch3 = await Scratch3Model.findByIdAndUpdate({ _id: scratch3Id }, payload);
    const updatedScratch3 = await Scratch3Model.find({ _id: scratch3Id });
    res.status(200).send({ msg: "Updated Scratch3", scratch3: updatedScratch3[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete scratch
router.delete("/:scratch3Id", async (req, res) => {
  const { scratch3Id } = req.params;
  try {
    const scratch3 = await Scratch3Model.findByIdAndDelete({ _id: scratch3Id });
    res.status(200).send({ msg: "Deleted Scratch3" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
