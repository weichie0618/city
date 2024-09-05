const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
require("dotenv").config();
const { sendPostRequest } = require("./public/javascripts/httpService");

const serviceAccountAuth = new JWT({
  email: "demo-sheet@winged-woods-385607.iam.gserviceaccount.com",
  key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDBfGTRuzW2gIuD\nXO8AY1PjlriZvgZhFYteT/5/vtDpAYpOtd+1TpJrn+zL1k0PSzuKWsOKvW29mj+O\nAmqtzuMIgtCcvdK/Bpd4+6AImPvF9D1FIdaLhuC+/0yS4d58DE+6imzmsaPkFTfM\nTwnlf3Xg5/4bY+tMkt/3RiKaADPWd7Brbm/dzgFHNfkUu9cZWA/qD0hZKaV3hcWM\nDWxnMPG+8jODdltU1/A2zmJwH0jQzjDDJXTAlcHrdJ6dlCquoG+bDysl4Npa5AV3\niCMHzqUwVfTbGUsHJ+mHKg/6CylttFJdKUSDzDQ9ZNTh0LagwbILF2CpOxluuQKF\n8eBWT2CxAgMBAAECggEAEWU5yr3oObrjoCk3Lyue942d1eu21txpIe7y+ID7NxGt\ngb9aCCrS4PR5RYfEOJlo1lrr7PG0N7lSGLZIqUz6DjI1p3vtAkHpVSYZSKCZdT4M\n0qX0zClRlDZvh96hAjnYorKukQycSaWrNTYPc5fSrShqaQPCHEmxs2F1u68EOhYz\nMe1decSJeGCknpvlnatKmtVMGr9HZae1WbjGe0Yu87YMxqFGl2Kx7vBcvkmp3Eh8\nNSq26U6FTcg2E3/eAzz7OM8Y9vYcEIG/GJYI7IeVGCqAWTcXz79gee5nCbUQWri5\nBkCX2S3x9DaAtDrewYepkxA82tfTA/GzGwjmDJysiQKBgQD3niAL5tBphevC2tNx\nOWxpr6oAwimDlalUB0lxOTS3Np8V+giAKQglJSYo4KjZ8Z9JSFobU4sszvtDbt4u\n+z0t7FsivNgiTFF9vhS+COOV2fQRgn6Gh/jN/8vZuGKsx54MFLD8tSzf7VSq0YV7\nWRh4GOePhCBXNOxDcEi6ivwEeQKBgQDICSiNOT4Xc6/plYtB/UYGcuHNxsmOPRNC\nD3IOkOoKlOGJtAcIXbyx5sRHXstUQcSBntk6PYdWjKwFwqRuBKsBx6Dgc7gP+VWp\nJgQIKUj0xOdvaDRyYGHW5R4NPKmkGnE+XEFWGxxB/LijCLQdfs+MWIwSNFz8GPRq\n5O8OlO9/+QKBgQCWHnNnQ8POdbZ9J5VQ63Nij3ENjKkGcVF68//+eKQQ/zhrZm6I\n5FdfzanY1nsHxoi/MPIP5xJVVBbYxvpEmWR51vVZlguin4o4JWkF3PW8/6oMg4SZ\now2gNhgsIrEP9uVGhbTXQC+4gnX2KZg3M8i15sNcKspAlIE4UXaGQYSQYQKBgQCr\nvck2Lr5TjjyrFHyiZFxZrwqVDKYB3AgLwI0RWnPGL/rPqmQbV7dpGhLMn+N8bJbV\nHtesPCVVNqN+spVP6+wSNB24d0HBXTWhawUtKJz9oYx+Rv44cO2vfbjmbn3LafRu\nMPDbh50kPmEbgJ57cGOrQF7KRnDK9HXszK8+WrqhqQKBgQC8XuErR6vjm4S/SXAd\nn7XTPmlHp7jaAPOTW8c8aZfiTCctY0NtpRpVfFCLw1ZrQlN7FMwkNLyAMpvxVrnZ\nWssm7IfSjF3ZsTd0Ovo9LoYKMVGBPacPianpKBbHjh5bLtNnb7D8tpcSwKJHEQYt\nxU+l3gOkz26vebMYnoBawyrugg==\n-----END PRIVATE KEY-----\n".replace(
    /\\n/g,
    "\n"
  ),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(
  "1OfZybeYBxztRgeJm5sfSwvaTpTMMOjFaIKJJwJninh8",
  serviceAccountAuth
);

let isInitialized = false;

async function initializeDoc() {
  if (!isInitialized) {
    await doc.loadInfo();
    isInitialized = true;
  }
}

async function saveToGoogleSheet(message, data) {
  await initializeDoc();

  try {
    const result = await sendPostRequest(
      "https://script.google.com/macros/s/AKfycbzVBHgSembVNtCAlKI3yGiff1d3FtHsfxUGA5OhqpVHgA9rr2KweNhl4DaSv5dBn2AynQ/exec",
      {
        message: message,
        userId: data.userId || "U162c1b996959d98ef7d27ebad1a4e10c",
        city: "burger",
      }
    );
    console.log("回傳成功:", result);
  } catch (error) {
    console.error("回傳錯誤:", error);
  }
}

async function main(data) {
  console.log(data);
  try {
    await initializeDoc();

    const sheet = doc.sheetsByTitle["line 登入資訊"];
    const sheet2 = doc.sheetsByTitle["加盟表帳密"];
    const usernameKey = Object.keys(data)[3];
    const passwordKey = Object.keys(data)[4];

    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    const userIdColumnIndex = headers.findIndex(
      (header) => header === Object.keys(data)[0]
    );

    const allRows = await sheet.getRows();
    const existingUserId = allRows.find(
      (row) => row._rawData[userIdColumnIndex] === data.userId
    );

    await sheet2.loadHeaderRow();
    const headers2 = sheet2.headerValues;

    const usernameColumnIndex = headers2.findIndex(
      (header) => header === usernameKey
    );
    const passwordColumnIndex = headers2.findIndex(
      (header) => header === passwordKey
    );

    if (usernameColumnIndex === -1 || passwordColumnIndex === -1) {
      console.log("找不到帳號或密碼欄位");
      return saveToGoogleSheet("系統異常", data);
    }

    const allRows2 = await sheet2.getRows();
    const targetRow = allRows2.find(
      (row) => row._rawData[usernameColumnIndex] === data[usernameKey]
    );

    if (!targetRow) {
      console.log("找不到匹配的帳號");
      return saveToGoogleSheet("帳號不存在", data);
    }

    const storedPassword = targetRow._rawData[passwordColumnIndex];
    if (storedPassword !== data[passwordKey]) {
      return saveToGoogleSheet("帳號密碼錯誤", data);
    }

    // 帳號密碼正確，新增使用者資料
    const newRow = headers.map((header) => {
      const dataFields = [
        "userId",
        "liffId",
        "lineUsername",
        usernameKey,
        passwordKey,
      ];
      return dataFields.includes(header) ? data[header] : "";
    });

    await sheet.addRow(newRow);
    console.log("新的一行已成功添加到表格中");

    return saveToGoogleSheet("帳號密碼正確", data);
  } catch (error) {
    console.error(error);
    return saveToGoogleSheet("發生錯誤", data);
  }
}

module.exports = {
  main: main,
  initializeDoc: initializeDoc,
};
