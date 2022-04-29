const express = require("express");
const router = express.Router();
const { ensureGuest, ensureAuth } = require("../middleware/auth");
const Story = require("../models/stories");
const path = require("path");
const User = require("../models/user");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("index.ejs");
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const user = req.user;
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard.ejs", {
      user,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("comps/500.ejs");
  }
});

// @desc    Show story add
// @route   GET /stories/add
router.get("/stories/add", ensureAuth, async (req, res) => {
  try {
    const { displayName, image, _id } = req.user;
    res.render("stories.ejs", { displayName, image, _id });
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Show edit page
// @route   GET /edit/:id
router.get("/stories/edit/:id", ensureAuth, async (req, res) => {
  try {
    const uniqueStory = await Story.findOne({
      _id: req.params.id,
    });
    res.render("editStory", { uniqueStory });
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Delete story
// @route   GET /delete/:id
router.get("/stories/delete/:id", ensureAuth, async (req, res) => {
  try {
    const uniqueStory = await Story.findByIdAndDelete({
      _id: req.params.id,
    });
    res.redirect("/stories");
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Guardar cambios de edición
// @route   POST /stories/guardarEdit
router.post("/stories/guardarEdit", ensureAuth, async (req, res) => {
  try {
    const { body, title, status, id } = req.body;
    let storyEdited = {
      body,
      title,
      status,
    };
    await Story.findByIdAndUpdate(id, storyEdited);
    res.redirect("/stories");
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Add story
// @route   POST /stories/add
router.post("/stories", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Ver storys
// @route   POST /stories
router.get("/stories", ensureAuth, async (req, res) => {
  try {
    let uniqueId = req.user._id;
    const stories = await Story.find({ status: "public" })
      .sort({ createdAdAt: "desc" })
      .lean();
    res.render("allStories.ejs", { stories, uniqueId });
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

// @desc    Ver storys
// @route   POST /stories
router.get("/stories/:id", ensureAuth, async (req, res) => {
  try {
    let storyId = req.params.id;
    const story = await Story.findOne({ _id: storyId });
    console.log(story);
    res.render("viewStory.ejs", { story });
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});
// @desc    Ver storys de un autor
// @route   POST /stories/user
router.get("/stories/user/:id", ensureAuth, async (req, res) => {
  try {
    let authorId = req.params.id;
    const stories = await Story.find({ user: authorId });
    res.render("storysUser.ejs", { stories });
  } catch (err) {
    console.error(err);
    res.render(path.join("comps", "500.ejs"));
  }
});

module.exports = router;
