import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const inputFilePath = env.DATA_RAW + 'COUNTRIES.json'
const outputFilePath = env.DATA_RAW + 'NOC.json'

const countries = require(inputFilePath)

const fileToCreate = countries.map((country, id) => {
    console.log('country:', country)

    return {
        id,
        name: country.fields.label_en,
        noc: country.fields.iso3_code,
        iso: country.fields.iso2_code
    }
})

console.log(fileToCreate.length + " noc has been created !")
fs.writeFile(outputFilePath, JSON.stringify(fileToCreate), () => console.log("NOC.json created !"))