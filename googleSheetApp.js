const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
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
    await doc.loadInfo(); // 加載文檔信息
    isInitialized = true;
  }
}

// 儲存googlesheet
async function saveToGoogleSheet(message, data) {
  await initializeDoc(); // 確保文檔已初始化

  const sheet = doc.sheetsByTitle["linetoken"];
  await sheet.loadHeaderRow();
  const headers = sheet.headerValues;

  // 尋找 userId 欄位的索引
  const userIdColumnIndex = headers.findIndex((header) => header === "userId");
  if (userIdColumnIndex === -1) {
    console.log("找不到 'userId' 欄位");
    return;
  }

  // 尋找匹配的 userId
  const allRows = await sheet.getRows();
  const targetRow = allRows.find(
    (row) => row._rawData[userIdColumnIndex] === data.userId
  );

  if (!targetRow) {
    console.log("找不到匹配的 userId");
    return;
  }

  // 尋找 token 欄位的索引
  const tokenColumnIndex = headers.findIndex((header) => header === "token");
  if (tokenColumnIndex === -1) {
    console.log("找不到 'token' 欄位");
    return;
  }

  // 獲取 token 值
  const token = targetRow._rawData[tokenColumnIndex];
  createLineBot(message, token);

  // 在這裡可以進行後續處理，例如返回 token 或進行其他操作
  // return token;
}

async function main(data) {
  console.log(data);
  try {
    await initializeDoc(); // 確保文檔已初始化

    const sheet = doc.sheetsByTitle["line 登入資訊"];
    const sheet2 = doc.sheetsByTitle["加盟表帳密"];
    var a = Object.keys(data)[3];
    var b = Object.keys(data)[4];
    const allRows = await sheet.getRows();

    // 加載標題行
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;

    // 檢查 userId 是否重複
    const userIdColumnIndex = headers.findIndex(
      (header) => header === Object.keys(data)[0]
    );

    const existingUserId = allRows.find(
      (row) => row._rawData[userIdColumnIndex] === data.userId
    );

    console.log("userId 不重複，可以繼續處理");

    // 加載標題行
    await sheet2.loadHeaderRow();
    const headers2 = sheet2.headerValues;

    const lineIdColumnIndex = headers2.findIndex((header) => header === a);

    if (lineIdColumnIndex === -1) {
      console.log("找不到 '帳號' 欄位");
      return;
    }

    // 尋找 帳號 的列
    console.log("帳號欄位索引:", lineIdColumnIndex);
    const allRows2 = await sheet2.getRows();
    const targetRowIndex = allRows2.findIndex(
      (row) => row._rawData[lineIdColumnIndex] === data[a]
    );
    console.log("輸入的帳號:", data[a]);
    if (targetRowIndex === -1) {
      console.log("找不到匹配的帳號");
      saveToGoogleSheet("帳號不存在", data);
    }

    console.log(`line id 列是第 ${targetRowIndex + 1} 列`);

    // 在該列尋找 "密碼" 欄位
    const accountColumnIndex = headers2.findIndex((header) => header === b);

    if (accountColumnIndex === -1) {
      console.log("找不到 '密碼' 欄位");
      return;
    }

    // 獲取該列的帳號值
    const accountValue = allRows2[targetRowIndex]._rawData[accountColumnIndex];
    console.log("密碼:" + accountValue);
    if (accountValue == data[b]) {
      if (!existingUserId) {
        console.log("userId 不存在，正在新增資料");
        await sheet.loadCells();
        // 準備新的一行數據
        const newRow = [];
        const dataFields = ["userId", "liffId", "lineUsername", "帳號", "密碼"];

        headers.forEach((header) => {
          if (dataFields.includes(header)) {
            newRow.push(data[header]);
          } else {
            newRow.push(""); // 對於其他列，填入空值
          }
        });

        // 在表格末尾添加新的一行
        await sheet.addRow(newRow);

        console.log("新的一行已成功添加到表格中");
      }
      return "帳號密碼正確";
    } else {
      return "帳號密碼錯誤";
    }
  } catch (error) {
    console.log(error);
    return "發生錯誤：", error;
  }
}

// 導出模塊
module.exports = {
  main: main,
  initializeDoc: initializeDoc,
};
