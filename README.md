# Home-Depot-PoC
Home Depot Scrapper PoC scraps data from the home depot API checks the price/stock and updates a google sheet. If the price has changed by 20%, this project will send an email alert to the owner.

The below APIs / References were used to create this PoC
- [Home Depot Srapper](https://stevesie.com/apps/home-depot-api)
- [Rapid API - Send Grid](https://rapidapi.com/sendgrid/api/sendgrid/)
- [Retrieve Data from Sheets (Laurence Svekis)](https://www.youtube.com/watch?v=aP2cM7EuLeo)
- [Sheet DB IO](https://docs.sheetdb.io/)


## Environment Variables
```
RAPID_API_KEY={RAP_API_KEY}
RAPID_API_HOST={RAPID_API_HOST}
GOOGLESHEETS_GET_URL=https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq
SHEETDB_ID={SHEET_DB_API}
EMAIL={YOU_EMAIL}
```

# How To Install + Run
  - `npm install`
  - `node src/index.js`
