import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'event.json'

const sportsFilePath = env.DATA_JSON + 'sport.json'

const sports = require(sportsFilePath)
const jsonArray = await csv().fromFile(csvFilePath);

let checkEvent = []
let events = []
let eventId = 0

jsonArray.forEach(event => {

    let exist = false

    if (checkEvent.findIndex(check => check === event.Event) !== -1) exist = true

    if (!exist) {
        checkEvent.push(event.Event)

        const sport = sports.find(sport => sport.name === event.Sport)

        events.push({
            id: eventId,
            name: event.Event,
            id_sport: sport.id
        })

        eventId++
    }
})

console.log(events.length + " events has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(events), () => console.log("event.csv created !"))