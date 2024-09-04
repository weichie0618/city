const db = require('../db');

async function addUser(values) {
  const text = "INSERT INTO user_data(username, password) VALUES($1, $2)";
  const insert_values = [values.username, values.password];
  try {
    const res = await db.pool.query(text, insert_values);
    return res;
  } catch (error) {
    return error;
  }
}

module.exports = { addUser };
