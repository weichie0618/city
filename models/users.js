const db = require("../googleSheetApp");

async function addUser(values) {
  try {
    const res = await db.main(values);
    return res;
  } catch (error) {
    return error;
  }
}

module.exports = { addUser };
