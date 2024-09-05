const fetch = require("node-fetch");

async function sendPostRequest(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP 錯誤！狀態碼：${response.status}`);
    }

    const responseData = await response.json();
    console.log("POST 請求成功，回應數據：", responseData);
    return responseData;
  } catch (error) {
    console.error("發送 POST 請求時發生錯誤：", error.message);
    throw new Error(`POST 請求失敗：${error.message}`);
  }
}

module.exports = {
  sendPostRequest,
};
