import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = env.DATA_RAW + 'GPD.csv'
const jsonFilePath = env.DATA_JSON + 'gpd.json'

const jsonArray = await csv().fromFile(csvFilePath);

let gpds = []
let gpdId = 0

jsonArray.forEach(gpd => {

    let range = 1960

    while (range !== 2021) {

        const value = (gpd[range] === "") ? null : gpd[range]

        const gpdToReturn = {
            id: gpdId,
            noc: gpd.NOC,
            year: range,
            value
        }

        gpds.push(gpdToReturn)

        range++
        gpdId++
    }
})

console.log(gpds.length + " gpds has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(gpds), () => console.log("gpd.csv created !"))