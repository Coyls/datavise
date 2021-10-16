import fs from 'fs'
import { env } from 'process';


const jsonFilePath = env.DATA_JSON + 'season.json'

const seasons = [
    {
        id: 0,
        name: "Summer"
    },
    {
        id: 1,
        name: "Winter"
    }
]

console.log(seasons.length + " seasons has been created !")
fs.writeFile(jsonFilePath, JSON.stringify(seasons), () => console.log("season.csv created !"))