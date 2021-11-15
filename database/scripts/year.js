
const fs = require('fs')
const { env } = require('process')

const jsonFilePath = env.DATA_JSON + 'year.json'

let startYear = 1960
let years = []

while (startYear !== 2021) {
    years.push({
        year: startYear
    })

    startYear++
}

console.log(years.length + " years has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(years), () => console.log("year.csv created !"))
