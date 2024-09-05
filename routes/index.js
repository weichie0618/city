var express = require("express");
var f = require("../googleSheetApp");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", async function (req, res, next) {
  return res.status(200).render("register");
});

router.post("/register", async function (req, res, next) {
  try {
    const data = {
      userId: req.body.userId,
      liffId: req.body.liffId,
      lineUsername: req.body.lineUsername,
      帳號: req.body.username,
      密碼: req.body.password,
    };
    const addUser = await f.main(data);
    console.log("dssf" + addUser);
  } catch (error) {
    console.error("過程中發生錯誤：", error);
    res.status(500).json({ error: "失敗" });
  }
});

module.exports = router;
