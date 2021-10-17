import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const csvFilePath = env.DATA_RAW + 'JO.csv'
const jsonFilePath = env.DATA_JSON + 'age.json'

const athletesFilePath = env.DATA_JSON + 'athlete.json'

const athletes = require(athletesFilePath)
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