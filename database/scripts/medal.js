import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath1 = env.DATA_JSON + 'medal_1.json'
const jsonFilePath2 = env.DATA_JSON + 'medal_2.json'
const jsonFilePath3 = env.DATA_JSON + 'medal_3.json'

const josFilePath = env.DATA_JSON + 'jo.json'
const eventsFilePath = env.DATA_JSON + 'event.json'
const athleteFilePath1 = env.DATA_JSON + 'athlete_1.json'
const athleteFilePath2 = env.DATA_JSON + 'athlete_2.json'

const jos = require(josFilePath)
const events = require(eventsFilePath)
const athletes1 = require(athleteFilePath1)
const athletes2 = require(athleteFilePath2)
const jsonArray = await csv().fromFile(csvFilePath);

const athletes = [...athletes1, ...athletes2]

let medals_1 = []
let medals_2 = []
let medals_3 = []
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



    if (medalId <= 100000) {
        medals_1.push(medalToPush)
    } else if (medalId > 100000 && medalId <= 200000) {
        medals_2.push(medalToPush)
    } else if (medalId > 200000) {
        medals_3.push(medalToPush)
    }

    medalId++
})

console.log(medals_1.length + " medals has been created !")
fs.writeFile(jsonFilePath1, JSON.stringify(medals_1), () => console.log("medal.csv created !"))
console.log(medals_2.length + " medals has been created !")
fs.writeFile(jsonFilePath2, JSON.stringify(medals_2), () => console.log("medal.csv created !"))
console.log(medals_3.length + " medals has been created !")
fs.writeFile(jsonFilePath3, JSON.stringify(medals_3), () => console.log("medal.csv created !"))