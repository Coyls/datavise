import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/raw-data/JO.csv'
import fs from 'fs'

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
fs.writeFile('./data-json/country.json', JSON.stringify(countries), () => console.log("Country create !"))

// COMMAND CSV : npm run csv-country
