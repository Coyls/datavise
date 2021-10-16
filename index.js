import csv from 'csvtojson';
import fs from 'fs'
import { env } from 'process';

const csvFilePath = "/home/coyls/Bureau/datavise/database/raw-data/JO.csv"


const jsonArray = await csv().fromFile(csvFilePath);

let minYear = 10000

jsonArray.forEach(year => {
    if (year.Year < minYear) minYear = year.Year
})

console.log("Minimum Year", minYear)