import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'sport.json'

const jsonArray = await csv().fromFile(csvFilePath);

let checkSport = []
let sports = []
let sportId = 0

jsonArray.forEach(sport => {

    let exist = false

    if (sport.Year < 1960) return

    if (checkSport.findIndex(check => check === sport.Sport) !== -1) exist = true

    if (!exist) {
        checkSport.push(sport.Sport)

        sports.push({
            id: sportId,
            name: sport.Sport,
        })

        sportId++
    }
})

console.log(sports.length + " sports has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(sports), () => console.log("sport.csv created !"))