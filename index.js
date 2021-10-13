import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/jo.csv'
import fs from 'fs'

const jsonArray = await csv().fromFile(csvFilePath);

let nbMedal = 0

let pays = []

jsonArray.forEach(jo => {
    if (jo.Medal === "Gold") {
        nbMedal++
    }

    let alreadyIn = false

    pays.forEach(p => {
        if (jo.Team === p.team) {
            alreadyIn = true
        }
    })


    if (!alreadyIn) pays.push({
        team: jo.Team,
        nbMedal: 0
    })
})

console.log(pays)
console.log(pays.length)

jsonArray.forEach(jo => {
    if (jo.Medal !== 'NA') {
        pays.forEach(p => {
            if (p.team === jo.Team) {
                p.nbMedal++
            }
        })
    }
})

fs.writeFile('test.json', JSON.stringify(pays), () => { console.log("OK !") })





