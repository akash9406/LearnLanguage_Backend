const express = require("express");
const model2 = require("../model/Words");
const words = model2.words;

exports.StoreWords = async (req, res) => {
  try {
    const data = await words.findOne({ userid: req.user._id });
    if (req.body.Language == "hi") {
      data.hi = data.hi + req.body.correctAns;
    } else if (req.body.Language == "ja") {
      data.ja = data.ja + req.body.correctAns;
    } else if (req.body.Language == "fr") {
      data.fr = data.fr + req.body.correctAns;
    } else {
      data.es = data.es + req.body.correctAns;
    }
    data.save();
    res.status(201).json({
      message: "working words store",
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getWords = async (req, res) => {
  try {
    const data = await words
      .findOne({ userid: req.user._id })
      .select("-userid")
      .select("-_id")
      .select("-__v");
    res.json({
      word: data,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
