import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'athlete.json'

const jsonArray = await csv().fromFile(csvFilePath);

let checkAthlete = []
let athletes = []
let athleteId = 0

jsonArray.forEach(athlete => {

    let exist = false

    if (checkAthlete.findIndex(check => check === athlete.Name) !== -1) exist = true

    if (!exist) {
        checkAthlete.push(athlete.Name)

        const height = (athlete.Height !== 'NA') ? athlete.Height : null
        const wheight = (athlete.Weight !== 'NA') ? athlete.Weight : null

        athletes.push({
            id: athleteId,
            name: athlete.Name,
            sex: athlete.Sex,
            height,
            wheight,
            team: athlete.Team,
            noc: athlete.NOC
        })

        athleteId++
    }
})

console.log(athletes.length + " athletes has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(athletes), () => console.log("athlete.csv created !"))


