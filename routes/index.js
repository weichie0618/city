var express = require("express");
var f = require("../googleSheetApp");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", async function (req, res, next) {
  return res.status(200).render("register");
});

router.post("/register", async function (req, res, next) {
  try {
    const data = { 帳號: req.body.username, 密碼: req.body.password };
    const addUser = await f.main(data);
    console.log("dssf" + addUser);
    console.log("dssf" + addUser);
    console.log("dssf" + addUser);
    if (addUser === "帳號密碼正確") {
      res.json({ message: "帳號密碼正確" });
    } else if (addUser === "帳號密碼錯誤") {
      res.json({ message: "帳號密碼錯誤" });
    } else {
      return res.status(500).json({ message: "內部伺服器錯誤" });
    }
  } catch (error) {
    console.error("註冊過程中發生錯誤：", error);
    res.status(500).json({ error: "註冊失敗" });
  }
});

module.exports = router;
