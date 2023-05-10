"use strict";

const dotenv = require("dotenv");
dotenv.config();

async function syncAllPrices() {
  // Cedar picket, pine picket, 80lbs concrete, 50lbs concrete, 4x4x8, 2x4x8
  const home_depot_items = [
    {"id": "205757688", "google_id": 1, "name":"Cedar Fence Picket"},
    {"id": "202319053", "google_id": 2, "name":"Pine Fence Picket"},
    {"id": "100318511", "google_id": 3, "name":"80 lb. Concrete Mix"},
    {"id": "100318521", "google_id": 4, "name":"50 lb. Fast-Setting Concrete Mix"},
    {"id": "205220341", "google_id": 5, "name":"4x4x8 #2 Ground Contact Pressure-Treated Pine Timber"},
    {"id": "206970948", "google_id": 6, "name":"2x4x8 #2 Ground Contact Pressure-Treated Lumber"}
  ]
  const raw_body = {
    "operationName": "productClientOnlyProduct",
    "variables": {
      "skipSpecificationGroup": false,
      "itemId": "205757688",
      "storeId": "8445",
      "zipCode": "72758",
      "skipKPF": false,
      "skipSubscribeAndSave": false
    },
    "query": "query productClientOnlyProduct($itemId: String!, $dataSource: String, $loyaltyMembershipInput: LoyaltyMembershipInput, $storeId: String, $skipSpecificationGroup: Boolean = false, $zipCode: String, $skipSubscribeAndSave: Boolean = false, $skipKPF: Boolean = false) {\n product(itemId: $itemId, dataSource: $dataSource, loyaltyMembershipInput: $loyaltyMembershipInput) {\n itemId\n dataSources\n identifiers {\n canonicalUrl\n brandName\n itemId\n modelNumber\n productLabel\n storeSkuNumber\n upcGtin13\n specialOrderSku\n toolRentalSkuNumber\n rentalCategory\n rentalSubCategory\n upc\n productType\n isSuperSku\n parentId\n roomVOEnabled\n sampleId\n __typename\n }\n availabilityType {\n discontinued\n status\n type\n buyable\n __typename\n }\n details {\n description\n collection {\n url\n collectionId\n __typename\n }\n highlights\n descriptiveAttributes {\n name\n value\n bulleted\n sequence\n __typename\n }\n infoAndGuides {\n name\n url\n __typename\n }\n installation {\n leadGenUrl\n __typename\n }\n __typename\n }\n media {\n images {\n url\n type\n subType\n sizes\n __typename\n }\n video {\n shortDescription\n thumbnail\n url\n videoStill\n link {\n text\n url\n __typename\n }\n title\n type\n videoId\n longDescription\n __typename\n }\n threeSixty {\n id\n url\n __typename\n }\n augmentedRealityLink {\n usdz\n image\n __typename\n }\n richContent {\n content\n __typename\n }\n __typename\n }\n pricing(storeId: $storeId) {\n promotion {\n dates {\n end\n start\n __typename\n }\n type\n description {\n shortDesc\n longDesc\n __typename\n }\n dollarOff\n percentageOff\n savingsCenter\n savingsCenterPromos\n specialBuySavings\n specialBuyDollarOff\n specialBuyPercentageOff\n experienceTag\n subExperienceTag\n anchorItemList\n itemList\n reward {\n tiers {\n minPurchaseAmount\n minPurchaseQuantity\n rewardPercent\n rewardAmountPerOrder\n rewardAmountPerItem\n rewardFixedPrice\n __typename\n }\n __typename\n }\n nvalues\n __typename\n }\n value\n alternatePriceDisplay\n alternate {\n bulk {\n pricePerUnit\n thresholdQuantity\n value\n __typename\n }\n unit {\n caseUnitOfMeasure\n unitsOriginalPrice\n unitsPerCase\n value\n __typename\n }\n __typename\n }\n original\n mapAboveOriginalPrice\n message\n preferredPriceFlag\n specialBuy\n unitOfMeasure\n __typename\n }\n reviews {\n ratingsReviews {\n averageRating\n totalReviews\n __typename\n }\n __typename\n }\n seo {\n seoKeywords\n seoDescription\n __typename\n }\n specificationGroup @skip(if: $skipSpecificationGroup) {\n specifications {\n specName\n specValue\n __typename\n }\n specTitle\n __typename\n }\n taxonomy {\n breadCrumbs {\n label\n url\n browseUrl\n creativeIconUrl\n deselectUrl\n dimensionName\n refinementKey\n __typename\n }\n brandLinkUrl\n __typename\n }\n favoriteDetail {\n count\n __typename\n }\n info {\n hidePrice\n ecoRebate\n quantityLimit\n sskMin\n sskMax\n unitOfMeasureCoverage\n wasMaxPriceRange\n wasMinPriceRange\n fiscalYear\n productDepartment\n classNumber\n paintBrand\n dotComColorEligible\n label\n prop65Warning\n returnable\n globalCustomConfigurator {\n customButtonText\n customDescription\n customExperience\n customExperienceUrl\n customTitle\n __typename\n }\n recommendationFlags {\n reqItems\n visualNavigation\n __typename\n }\n replacementOMSID\n hasSubscription\n minimumOrderQuantity\n projectCalculatorEligible\n subClassNumber\n calculatorType\n isLiveGoodsProduct\n protectionPlanSku\n hasServiceAddOns\n __typename\n }\n fulfillment(storeId: $storeId, zipCode: $zipCode) {\n backordered\n fulfillmentOptions {\n type\n services {\n type\n locations {\n isAnchor\n inventory {\n isLimitedQuantity\n isOutOfStock\n isInStock\n quantity\n isUnavailable\n maxAllowedBopisQty\n minAllowedBopisQty\n __typename\n }\n type\n storeName\n locationId\n curbsidePickupFlag\n isBuyInStoreCheckNearBy\n distance\n state\n storePhone\n __typename\n }\n deliveryTimeline\n deliveryDates {\n startDate\n endDate\n __typename\n }\n deliveryCharge\n dynamicEta {\n hours\n minutes\n __typename\n }\n hasFreeShipping\n freeDeliveryThreshold\n totalCharge\n __typename\n }\n fulfillable\n __typename\n }\n anchorStoreStatus\n anchorStoreStatusType\n backorderedShipDate\n bossExcludedShipStates\n sthExcludedShipState\n bossExcludedShipState\n excludedShipStates\n seasonStatusEligible\n onlineStoreStatus\n onlineStoreStatusType\n inStoreAssemblyEligible\n __typename\n }\n sizeAndFitDetail {\n attributeGroups {\n attributes {\n attributeName\n dimensions\n __typename\n }\n dimensionLabel\n productType\n __typename\n }\n __typename\n }\n subscription @skip(if: $skipSubscribeAndSave) {\n defaultfrequency\n discountPercentage\n subscriptionEnabled\n __typename\n }\n badges(storeId: $storeId) {\n label\n color\n creativeImageUrl\n endDate\n message\n name\n timerDuration\n timer {\n timeBombThreshold\n daysLeftThreshold\n dateDisplayThreshold\n message\n __typename\n }\n __typename\n }\n keyProductFeatures @skip(if: $skipKPF) {\n keyProductFeaturesItems {\n features {\n name\n refinementId\n refinementUrl\n value\n __typename\n }\n __typename\n }\n __typename\n }\n seoDescription\n installServices {\n scheduleAMeasure\n __typename\n }\n dataSource\n __typename\n }\n}\n"
  }
  const headers = {
    'accept': '*/*',
    'x-debug': false,
    'x-experience-name': 'general-merchandise',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36',
    'Content-Type': 'application/json',
    'origin': 'https://www.homedepot.com',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'accept-encoding': 'gzip, deflate, br',
    'accept-language': 'en-US,en;q=0.9',
    'referer': 'https://www.homedepot.com/',
    'cookie': 'HD_DC=beta; check=true; THD_CACHE_NAV_PERSIST=; WORKFLOW=GEO_LOCATION; THD_FORCE_LOC=1; THD_INTERNAL=0; DELIVERY_ZIP={{ zip_code}}; DELIVERY_ZIP_TYPE=DEFAULT;; HD_DC=origin; _abck=F8F363DC53E60D740F4A78CE7F65ECFE~-1~YAAQFI0duFm0/eKHAQAAs8QA/Qkpi01DRmicWCqY1QKOGpgs1x9EDdUIAsE6mtwMgQSJwZCgYSokmk2l56nd3U7ZCFfya8n2Jec9HbGPFTMG0zgPF6FFPkiiij+S5jt7ZCiZlwaj9N04IlKRSTVyHDz9mZSQdANmi5NNAxI4Wp3bzRjnXtOMGqDY1MtP95rrid+jCn+xQ5WxCmDCC2Dqdb/PCxL3K6uctJ52jArZLkSNLIZFilA0vQ/cnKFP/a04HZxBTv4XLgWs30ESSOc8UBd7fJsK2VAdT1Awxn1mQPHK9HEflXWZRsKaGD/aRGWYxssvbwZ1ztioEcBSWRkoWv6yzeo5Iie+ibN4YWKVLNkQ4FZm9iz2ljZ4zao=~-1~-1~-1; ak_bmsc=B30DAAB72A7DBB87BF9196FC0F073F14~000000000000000000000000000000~YAAQNY0duMGIItiHAQAAR4AQ/ROw/L6DL1ihQvrWUEtevpZobzY3j5+C+856X7NEHNvcQ/2x8nUvYc/QVB3UAJO7vjkU7Ru0w7J9byE09gdD+s0Atd995Kz4+3tQzQmc7NShJPoNPreHncAOK/1l7ufyzl9k4b/Vew5aXAWTLeyVCKTfHCCY/5El8Nxa30lnmsGiVSJ9V84hHei+bxPNJ9keYQEMkbCrarN6BhTTqU4rfwqR0CgpuYk3ZlpZ2cuwTrMA7Zhey8dD1xwSLnriIL/gEfhWHhJyzhNLaT9t21w8MM8cU3ACbm4DeD0yIvtGKDJ3BytEiCVU7q8IVHyI48mVPjvqQlbSkvPJO61hEe5x/FBtw8faKqj2t3G65YiKvYvqvS1T+E0F; bm_sz=C12FE69DD17C6A450FE3E0E279906C8B~YAAQFI0duFu0/eKHAQAAtMQA/RMn80vpJr/FXqc53DojKu61oWBTPK4GZ075jSOlJWHep8kaQefbaKJqVupC+6KCMzeNEdU/QF+PTHbWwCWgkVeD+7bHNzCw6NR6VredVmWGwQg8KUzEN6FV5W/ytnnZiN+HC3sPK2m+i6/R1mkLklfpA/FuVRfi8bt4YtlWiINks1Uc6EmHwRfKqoMulTpExXXYokwOB1Ypw5WSmP7NlZ4zBvEOGlsX2sqK31Oa4Nk7Fc05GX8peA0fNjXBDHj9YpIK7ZxbDC/p6qLOjlwedPxoMKo=~3225921~3421507; akacd_usbeta=3861029697~rv=57~id=96f930cde52ccd765284ca4f7407eeeb'
  }


  for (let i = 0; i < home_depot_items.length; i++) {
    const url = `https://www.homedepot.com/federation-gateway/graphql?opname=productClientOnlyProduct`;
    raw_body.variables.itemId = home_depot_items[i].id
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(raw_body)
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      home_depot_items[i].price = result.data.product.pricing.value
      home_depot_items[i].inStock = result.data.product.fulfillment?.fulfillmentOptions[0]?.services[0]?.locations[0]?.inventory?.quantity
    } catch (error) {
      console.error(error);
    }
  }

  await syncGoogleSheets(home_depot_items)
}

async function syncGoogleSheets(home_depot_items) {
  const options = {
    method: 'GET',
  };
  const spreadsheet_url = process.env.GOOGLESHEETS_GET_URL
  const response = await fetch(spreadsheet_url, options);
  const rawData = await response.text();
  const data = JSON.parse(rawData.substr(47).slice(0,-2))

  for (let i = 0; i < home_depot_items.length; i++) {
    console.log(`${"-".repeat(80)}\nName=${data.table.rows[i].c[1].v} === ${home_depot_items[i].name} \nPrice=${data.table.rows[i].c[2].v}===${home_depot_items[i].price}\nStock=${data.table.rows[i].c[3].v} === ${home_depot_items[i].inStock}`)
    if (data.table.rows[i].c[1].v === home_depot_items[i].name && data.table.rows[i].c[2].v === home_depot_items[i].price && data.table.rows[i].c[3].v === home_depot_items[i].inStock) {
      console.log(`NO UPDATES REQUIRED for - ${home_depot_items[i].name}`)
    } else if (data.table.rows[i].c[1].v === home_depot_items[i].name && data.table.rows[i].c[2].v === home_depot_items[i].price && data.table.rows[i].c[3].v > 100){
      console.log(`NO UPDATES REQUIRED - ONLY Stock change - ${home_depot_items[i].name}`)
    } else {
      await updateGoogleSheet(home_depot_items[i])
    }

    if (home_depot_items[i].price > (data.table.rows[i].c[4].v*1.2)
        || home_depot_items[i].price < (data.table.rows[i].c[4].v*0.8)) {
      await sendEmail(home_depot_items[i], data.table.rows[i].c[4].v)
    }
  }
}

async function updateGoogleSheet(home_depot_item) {
  console.log(`Updating... ${home_depot_item.name}`)
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  let raw = JSON.stringify({
    "name": home_depot_item.name,
    "price": home_depot_item.price,
    "stock": home_depot_item.inStock
  });

  let requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  try {
  const response = await fetch(`https://sheetdb.io/api/v1/${process.env.SHEETDB_ID}/id/${home_depot_item.google_id}`, requestOptions)
  const rawData = await response.text();
  console.log(rawData)
  } catch (error) {
    console.error(error);
  }
}

async function sendEmail(home_depot_item, avgPrice) {
  const url = "https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send"
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("X-RapidAPI-Key", process.env.RAPID_API_KEY);
  myHeaders.append("X-RapidAPI-Host", process.env.RAPID_API_HOST);

  const raw_body = {
    "personalizations": [
      {
        "to": [
          {
            "email": process.env.EMAIL
          }
        ],
        "subject": "Material Price Change"
      }
    ],
    "from": {
      "email": "FalconFencing@gmail.com"
    },
    "content": [
      {
        "type": "text/plain",
        "value": `${home_depot_item.name} price has significantly changed from avgPrice=$${avgPrice} currentPrice=$${home_depot_item.price}`
      }
    ]
  }
  const options = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw_body),
    redirect: 'follow'
  };
  const response = await fetch(url, options);
  console.log(`sendEmail - ${home_depot_item.name} - response.status=${response.status}`)
}

module.exports = {
  syncAllPrices,
};
