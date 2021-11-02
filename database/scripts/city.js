import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const countriesFilePath = env.DATA_JSON + 'country.json'
const citiesFilePath = env.DATA_RAW + 'CITY.json'
const jsonFilePath = env.DATA_JSON + 'city.json'
const joFilePath = env.DATA_RAW + 'JO.csv'


const countries = require(countriesFilePath)
const cities = require(citiesFilePath)
const jos = await csv().fromFile(joFilePath);


let cityToWrite = []
let cityId = 0

cities.forEach(city => {

    const country = countries.find(country => country.iso === city.noc)
    const jo = jos.find(jo => jo.City === city.name && jo.Year >= 1960)

    if (jo?.Year >= 1960) {



        const cityToPush = {
            id: cityId,
            name: jo.City,
            id_country: country.id,
            lat: city.lat,
            lng: city.lng
        }

        cityToWrite.push(cityToPush)


        cityId++

    }

})


console.log(cityToWrite.length + " cities has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(cityToWrite), () => console.log("city.csv created !"))



