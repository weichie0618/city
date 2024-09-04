var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/register', async function(req, res, next) {
 return res.status(200).render('register');
});

router.post('/register', async function(req, res, next) {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const data = {'username': req.body.username, 'password': hashPassword}
  const addUser = await User.addUser(data);
  console.log(addUser);
  if (addUser.severity === "ERROR") {
    // 如果遇到內部伺服器錯誤，回應 500 錯誤訊息給使用者
    if (addUser.code === "23505") {
      return res.status(500).send({'message':'該使用者名稱已被註冊'});
    } else {
      return res.status(500).send({'message':'內部伺服器錯誤'});
    }
  } else {
    // 如果成功新增使用者，回應 200 成功訊息給使用者
    return res.status(200).send({'message':'使用者註冊成功'});
  }
});

module.exports = router;
