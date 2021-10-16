import fs from 'fs'
import { env } from 'process';


const jsonFilePath = env.DATA_JSON + 'season.json'

const seasons = [
    {
        season: "summer"
    },
    {
        season: "winter"
    }
]

console.log(seasons.length + " seasons has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(seasons), () => console.log("season.csv created !"))