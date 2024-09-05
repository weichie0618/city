const db = require("./db");

async function testInsert() {
  try {
    // 修改這裡：將 'users' 改為 'user_data'
    const text =
      "INSERT INTO user_data(username, password) VALUES($1, $2) RETURNING *";
    const values = ["testuser", "testpassword"];

    const res = await db.query(text, values);
    console.log("插入成功：", res.rows[0]);
  } catch (err) {
    console.error("插入錯誤：", err);
  } finally {
    await db.pool.end();
  }
}

testInsert().then(() => console.log("測試完成"));
