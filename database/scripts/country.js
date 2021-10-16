import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'country.json'

const jsonArray = await csv().fromFile(csvFilePath);

let checkCountry = []
let countries = []
let countryId = 0

jsonArray.forEach(country => {

    let exist = false

    if (checkCountry.findIndex(check => check === country.Team) !== -1) exist = true

    if (!exist) {
        checkCountry.push(country.Team)

        countries.push({
            noc: country.NOC,
            name: country.Team,
        })

        countryId++
    }
})

console.log(countries.length + " countries has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(countries), () => console.log("country.csv created !"))


