import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/raw-data/JO.csv'
import fs from 'fs'

const jsonArray = await csv().fromFile(csvFilePath);

let checkAthlete = []
let athletes = []

jsonArray.forEach(person => {

    let exist = false

    if (checkAthlete.findIndex(check => check === person.Name) !== -1) exist = true

    if (!exist) {
        checkAthlete.push(person.Name)

        const height = (person.Height !== 'NA') ? person.Height : null
        const wheight = (person.Weight !== 'NA') ? person.Weight : null

        athletes.push({
            name: person.Name,
            sex: person.Sex,
            height,
            wheight,
            team: person.Team
        })
    }
})

console.log('athletes:', athletes)
fs.writeFile('./data-json/athlete.json', JSON.stringify(athletes), () => console.log("Athlete create !"))

// COMMAND CSV : npm run csv-athlete

