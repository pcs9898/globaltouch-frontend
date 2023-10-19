const XLSX = require("xlsx");
const fs = require("fs");

// 엑셀 파일 열기
const workbook = XLSX.readFile(
  "./국가정보(국가코드,한글국가이름,영어국가이름,위도,경도).xlsx"
);

// 첫 번째 워크시트 이름 가져오기
const sheetName = workbook.SheetNames[0];

// 첫 번째 워크시트의 데이터를 JSON 형태로 변환하기
let worksheet = workbook.Sheets[sheetName];
let dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

let dataObject = {};

// 첫번째 행(인덱스 0)은 헤더이므로 두번째 행(인덱스 1)부터 시작합니다.
for (let i = 1; i < dataArray.length; i++) {
  let row = dataArray[i];
  dataObject[row[0]] = {
    // row[0]은 '국가코드'입니다.
    korName: row[1], // row[1]은 '한글국가이름'입니다.
    engName: row[2], // row[2]은 '영어국가이름'입니다.
    lat: row[3], // row[3]은 '위도'입니다.
    lng: row[4], // row[4]는 '경도'입니다.
  };
}

// JSON 형태의 데이터를 문자열로 변환하고, 이를 파일에 쓰기
fs.writeFileSync(
  "./public/countriesInfo.json",
  JSON.stringify(dataObject, null, 2)
);

console.log("File has been saved.");
