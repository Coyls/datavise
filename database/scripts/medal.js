import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'medal.json'

const josFilePath = env.DATA_JSON + 'jo.json'
const eventsFilePath = env.DATA_JSON + 'event.json'
const athleteFilePath = env.DATA_JSON + 'athlete.json'

const jos = require(josFilePath)
const events = require(eventsFilePath)
const athletes = require(athleteFilePath)
const jsonArray = await csv().fromFile(csvFilePath);

let medals = []
let medalId = 0

jsonArray.forEach(medal => {

    const seasonToCheck = medal.Season

    const jo = jos.find(jo => jo.year === medal.Year && jo.season === seasonToCheck.toLowerCase())
    const event = events.find(event => event.name === medal.Event)
    const athlete = athletes.find(athlete => athlete.name === medal.Name)

    const type = (medal.Medal === "NA") ? "none" : medal.Medal

    const medalToPush = {
        id: medalId,
        type,
        id_jo: jo.id,
        id_event: event.id,
        id_athlete: athlete.id
    }

    medals.push(medalToPush)

    medalId++
})

console.log(medals.length + " medals has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(medals), () => console.log("medal.csv created !"))