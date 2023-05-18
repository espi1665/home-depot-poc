# Home-Depot-PoC
Home Depot Scrapper PoC is a CRON serive that runs every morning on Github Actions. It scraps data from home depot, checks the price/stock, and updates a google sheet. If the price has changed by 20%, this project will send an email alert to the owner.

This PoC has improved accuracy of fencing bids, and decreased the time to create a bid by 30%. 

The below APIs / References were used to create this PoC
- [Home Depot Scrapper](https://stevesie.com/apps/home-depot-api)
- [Rapid API - Send Grid](https://rapidapi.com/sendgrid/api/sendgrid/)
- [Retrieve Data from Sheets (Laurence Svekis)](https://www.youtube.com/watch?v=aP2cM7EuLeo)
- [Sheet DB IO](https://docs.sheetdb.io/)


## Google Sheets Example

Below is a snapshot of the one-stop-shop:

![Screenshot 2023-05-18 at 2 20 03 PM](https://github.com/espi1665/home-depot-poc/assets/35710742/7af95f72-7a54-4c3e-9af0-1e30937ad0f9)



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
