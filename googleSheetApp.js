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
async function main(data) {
  console.log(data);
  try {
    await initializeDoc(); // 確保文檔已初始化

    const sheet = doc.sheetsByIndex[0];
    var a = Object.keys(data)[0];
    var b = Object.keys(data)[1];

    // 加載標題行
    await sheet.loadHeaderRow();

    const headers = sheet.headerValues;
    const lineIdColumnIndex = headers.findIndex((header) => header === a);

    if (lineIdColumnIndex === -1) {
      console.log("找不到 'line id' 欄位");
      return;
    }

    // 尋找 帳號 的列
    const allRows = await sheet.getRows();
    const targetRowIndex = allRows.findIndex(
      (row) => row._rawData[lineIdColumnIndex] === data[a]
    );

    if (targetRowIndex === -1) {
      console.log("找不到 帳號 的列");
      return;
    }

    console.log(`line id 為 2 的列是第 ${targetRowIndex + 1} 列`);

    // 在該列尋找 "密碼" 欄位
    const accountColumnIndex = headers.findIndex((header) => header === b);

    if (accountColumnIndex === -1) {
      console.log("找不到 '密碼' 欄位");
      return;
    }

    // 獲取該列的帳號值
    const accountValue = allRows[targetRowIndex]._rawData[accountColumnIndex];
    if (accountValue == data[b]) {
      return "帳號密碼正確";
    } else {
      return "帳號密碼錯誤";
    }
  } catch (error) {
    return "發生錯誤：", error;
  }
}

// 導出模塊
module.exports = {
  main: main,
  initializeDoc: initializeDoc,
};
