import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

// COMMAND CSV : npm run csv-country

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'country.json'

const jsonArray = await csv().fromFile(csvFilePath);

let checkCountry = []
let countries = []

jsonArray.forEach(c => {

    let exist = false

    if (checkCountry.findIndex(check => check === c.Team) !== -1) exist = true

    if (!exist) {
        checkCountry.push(c.Team)

        countries.push({
            name: c.Team,
            noc: c.NOC
        })
    }
})

console.log('country', countries)
fs.writeFile(jsonFilePath, JSON.stringify(countries), () => console.log("Country create !"))


