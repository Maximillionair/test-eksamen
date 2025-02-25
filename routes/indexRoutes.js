const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController")

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/faq", (req, res) => {
  res.render("faq");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/map", (req, res) => {
  res.render("map");
});

router.get("/database", (req, res) => {
  res.render("database");
});

router.get("/addReindeer", (req, res) => {
  res.render("addReindeer");
});

module.exports = router;
