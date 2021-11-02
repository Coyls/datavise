import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';


const csvFilePath = env.DATA_RAW + 'country-codes.csv'
const jsonFilePath = env.DATA_JSON + 'country.json'

const jsonArray = await csv().fromFile(csvFilePath);


let countries = jsonArray.map((country, id) => {

    const name = (country["UNTERM English Short"] !== "") ? country["UNTERM English Short"] : country["CLDR display name"]

    return {
        id,
        name,
        iso: country["ISO3166-1-Alpha-3"],
        noc: country.IOC
    }
})


console.log(countries.length + " countries has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(countries), () => console.log("country.csv created !"))


