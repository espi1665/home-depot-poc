"use strict";

require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();

async function syncAllPrices() {
  const home_depot_items = require("./json/homeDepotItems.json");
  const headers = require("./json/homeDepotAPIHeaders.json");
  const raw_body = require("./json/homeDepotAPIBody.json");

  for (let counter = 0; counter < home_depot_items.length; counter++) {
    raw_body.variables.storeId = home_depot_items[counter].storeId;
    for (let i = 0; i < home_depot_items[counter].items.length; i++) {
      const url = `https://www.homedepot.com/federation-gateway/graphql?opname=productClientOnlyProduct`;
      raw_body.variables.itemId = home_depot_items[counter].items[i].id;
      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(raw_body),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        home_depot_items[counter].items[i].price =
          result.data.product.pricing.value;
        home_depot_items[counter].items[i].inStock =
          result.data.product.fulfillment?.fulfillmentOptions[0]?.services[0]?.locations[0]?.inventory?.quantity;
      } catch (error) {
        console.error(error);
      }
    }

    await syncGoogleSheets(home_depot_items[counter]);
  }
}

async function syncGoogleSheets(home_depot_items) {
  const options = {
    method: "GET",
  };
  const spreadsheet_url = process.env.GOOGLESHEETS_GET_URL;
  const response = await fetch(spreadsheet_url, options);
  const rawData = await response.text();
  const data = JSON.parse(rawData.substr(47).slice(0, -2));

  let isRogersStore = 0; // Is Rogers Store
  if (home_depot_items.storeId === "1403") {
    isRogersStore = 6; // Is Fayetteville
    console.log(`${"-".repeat(80)}\n${"*".repeat(80)}\nSync Fayetteville Home Depot=${home_depot_items.storeId}\n${"*".repeat(80)}`)
  } else {
    console.log(`${"-".repeat(80)}\n${"*".repeat(80)}\nSync Rogers Home Depot=${home_depot_items.storeId}\n${"*".repeat(80)}`)
  }
  for (let i = 0; i < home_depot_items.items.length; i++) {
    console.log(
      `${"-".repeat(80)}\nName=${data.table.rows[i].c[1].v} === ${
        home_depot_items.items[i].name
      } \nPrice=${data.table.rows[i].c[2].v}===${
        home_depot_items.items[i].price
      }\nStock=${data.table.rows[i].c[3].v} === ${
        home_depot_items.items[i].inStock
      }`
    );
    if (
      data.table.rows[i + isRogersStore].c[1].v ===
        home_depot_items.items[i].name &&
      data.table.rows[i + isRogersStore].c[2].v ===
        home_depot_items.items[i].price &&
      home_depot_items.items[i].inStock <
        data.table.rows[i + isRogersStore].c[3].v * 1.2 &&
      home_depot_items.items[i].inStock >
        data.table.rows[i + isRogersStore].c[3].v * 0.8 &&
      data.table.rows[i + isRogersStore].c[3].v > 100
    ) {
      console.log(
        `NO UPDATES REQUIRED for - ${home_depot_items.items[i].name}`
      );
    } else {
      await updateGoogleSheet(home_depot_items.items[i]);
    }

    if (
      home_depot_items.items[i].price >
        data.table.rows[i + isRogersStore].c[4].v * 1.2 ||
      home_depot_items.items[i].price < data.table.rows[i].c[4].v * 0.8
    ) {
      await sendEmail(
        home_depot_items.items[i],
        data.table.rows[i + isRogersStore].c[4].v
      );
    }
  }
}

async function updateGoogleSheet(home_depot_item) {
  console.log(`Updating... ${home_depot_item.name}`);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  let raw = JSON.stringify({
    name: home_depot_item.name,
    price: home_depot_item.price,
    stock: home_depot_item.inStock,
  });

  let requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  try {
    const response = await fetch(
      `https://sheetdb.io/api/v1/${process.env.SHEETDB_ID}/id/${home_depot_item.google_id}`,
      requestOptions
    );
    const rawData = await response.text();
    console.log(rawData);
  } catch (error) {
    console.error(error);
  }
}

async function sendEmail(home_depot_item, avgPrice) {
  const url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send";
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-RapidAPI-Key", process.env.RAPID_API_KEY);
  myHeaders.append("X-RapidAPI-Host", process.env.RAPID_API_HOST);

  const raw_body = {
    personalizations: [
      {
        to: [
          {
            email: process.env.EMAIL,
          },
        ],
        subject: "Material Price Change",
      },
    ],
    from: {
      email: "FalconFencing@gmail.com",
    },
    content: [
      {
        type: "text/plain",
        value: `${home_depot_item.name} price has significantly changed from avgPrice=$${avgPrice} currentPrice=$${home_depot_item.price}`,
      },
    ],
  };
  const options = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(raw_body),
    redirect: "follow",
  };
  const response = await fetch(url, options);
  console.log(
    `sendEmail - ${home_depot_item.name} - response.status=${response.status}`
  );
}

module.exports = {
  syncAllPrices,
};
