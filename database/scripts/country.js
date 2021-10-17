import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'NOC.json'
const jsonFilePath = env.DATA_JSON + 'country.json'

const NOC = require(csvFilePath);

let countries = NOC.map(country => {

    return {
        noc: country.noc,
        name: country.name
    }
})

countries.push({ noc: "EUN", name: "Unified Team" })

console.log(countries.length + " countries has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(countries), () => console.log("country.csv created !"))


