import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath1 = env.DATA_JSON + 'athlete_1.json'
const jsonFilePath2 = env.DATA_JSON + 'athlete_2.json'

const jsonArray = await csv().fromFile(csvFilePath);

let checkAthlete = []
let athletes_1 = []
let athletes_2 = []
let athleteId = 0




jsonArray.forEach(athlete => {

    let exist = false

    if (checkAthlete.findIndex(check => check === athlete.Name) !== -1) exist = true

    if (!exist) {
        checkAthlete.push(athlete.Name)

        const height = (athlete.Height !== 'NA') ? athlete.Height : null
        const wheight = (athlete.Weight !== 'NA') ? athlete.Weight : null

        const athleteToPush = {
            id: athleteId,
            name: athlete.Name,
            sex: athlete.Sex,
            height,
            wheight,
            team: athlete.Team,
            noc: athlete.NOC
        }

        if (athleteId <= 75000) {
            athletes_1.push(athleteToPush)
        } else if (athleteId > 75000) {
            athletes_2.push(athleteToPush)
        }


        athleteId++
    }
})

// rajouter pour les 2 autre fivhire

console.log(athletes_1.length + " athletes has been created !")
fs.writeFile(jsonFilePath1, JSON.stringify(athletes_1), () => console.log("athletes_1.csv created !"))
console.log(athletes_2.length + " athletes has been created !")
fs.writeFile(jsonFilePath2, JSON.stringify(athletes_2), () => console.log("athletes_2.csv created !"))



