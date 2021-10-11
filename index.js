import csv from 'csvtojson';
const csvFilePath = '/home/coyls/Bureau/datavise/jo.csv'

const jsonArray = await csv().fromFile(csvFilePath);

let nbMedal = 0

let sports = []

jsonArray.forEach(jo => {
    if (jo.Medal === "Gold") {
        nbMedal++
    }

    let alreadyIn = false

    sports.forEach(sport => {
        if (jo.Sport === sport) {
            alreadyIn = true
        }
    })

    if (!alreadyIn) sports.push(jo.Sport)
})

console.log(sports)
console.log(sports.length)



