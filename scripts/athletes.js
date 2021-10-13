import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/raw-data/jo.csv'
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
            wheight
        })
    }
})

console.log('athletes:', athletes)
fs.writeFile('athletes.json', JSON.stringify(athletes), () => console.log("Athlete create !"))

// COMMAND CSV
// json2csv -i ./datas/athletes.json -f name,sex,height,wheight -o ./datas/athletes.csv
