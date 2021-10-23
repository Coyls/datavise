import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'age.json'

const athleteFilePath1 = env.DATA_JSON + 'athlete_1.json'
const athleteFilePath2 = env.DATA_JSON + 'athlete_2.json'
const athletes1 = require(athleteFilePath1)
const athletes2 = require(athleteFilePath2)

const athletes = [...athletes1, ...athletes2]
const jsonArray = await csv().fromFile(csvFilePath);

let ages = []
let ageId = 0

jsonArray.forEach(age => {

    const { id } = athletes.find(athlete => athlete.name === age.Name)

    const ageToPush = {
        age: age.Age,
        year: age.Year,
        id_athlete: id
    }

    if (ages.findIndex(({ age, year, id_athlete }) => age === ageToPush.age && year === ageToPush.year && id_athlete === ageToPush.id_athlete) === -1) {
        ages.push({ id: ageId, ...ageToPush })
        ageId++
    }

})

console.log(ages.length + " ages has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(ages), () => console.log("age.csv created !"))