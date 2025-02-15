// // import { google } from "googleapis";
// import { NextResponse } from "next/server";

// const auth = new google.auth.GoogleAuth({
//   credentials: {
//     client_email: process.env.GOOGLE_CLIENT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//   },
//   scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
// });

// const sheets = google.sheets({ version: "v4", auth });

// export async function GET(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const sheetId = searchParams.get("sheetId");
//     const range = searchParams.get("range");

//     const response = await sheets.spreadsheets.values.get({
//       spreadsheetId: sheetId,
//       range: range,
//     });

//     const rows = response.data.values;
//     if (!rows || rows.length === 0) {
//       return NextResponse.json({ error: "No data found." }, { status: 404 });
//     }

//     // 헤더를 키로 사용하여 데이터 변환
//     const headers = rows[0];
//     const data = rows.slice(1).map((row) => {
//       const item = {};
//       headers.forEach((header, index) => {
//         item[header] = row[index];
//       });
//       return item;
//     });

//     return NextResponse.json({ data });
//   } catch (error) {
//     console.error("Error fetching spreadsheet:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch data" },
//       { status: 500 }
//     );
//   }
// }
