

(async () => {


    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')


    const csvFilePath = env.DATA_RAW + 'JO.csv'
    const jsonFilePath1 = env.DATA_JSON + 'medal_1.json'
    const jsonFilePath2 = env.DATA_JSON + 'medal_2.json'
    const jsonFilePath3 = env.DATA_JSON + 'medal_3.json'

    const josFilePath = env.DATA_JSON + 'jo.json'
    const countriesFilePath = env.DATA_JSON + 'country.json'


    const jos = require(josFilePath)
    const countries = require(countriesFilePath)
    const jsonArray = await csv().fromFile(csvFilePath);


    let medals_1 = []
    let medals_2 = []
    let medals_3 = []
    let medalId = 0

    jsonArray.forEach(medal => {

        if (medal.Year < 1960) return

        const seasonToCheck = medal.Season

        const jo = jos.find(jo => jo.year === parseInt(medal.Year) && jo.season === seasonToCheck.toLowerCase())
        let country = countries.find(country => country.noc === medal.NOC)

        if (!country) country = { id: null }

        if (!jo) console.log(medal)

        const type = (medal.Medal === "NA") ? "none" : medal.Medal

        const medalToPush = {
            id: medalId,
            type,
            id_jo: jo.id,
            id_country: country.id
        }



        if (medalId <= 75000) {
            medals_1.push(medalToPush)
        } else if (medalId > 75000 && medalId <= 150000) {
            medals_2.push(medalToPush)
        } else if (medalId > 150000) {
            medals_3.push(medalToPush)
        }

        medalId++
    })

    console.log(medals_1.length + " medals has been created !")
    fs.writeFile(jsonFilePath1, JSON.stringify(medals_1), () => console.log("medal.csv created !"))
    console.log(medals_2.length + " medals has been created !")
    fs.writeFile(jsonFilePath2, JSON.stringify(medals_2), () => console.log("medal.csv created !"))
    console.log(medals_3.length + " medals has been created !")
    fs.writeFile(jsonFilePath3, JSON.stringify(medals_3), () => console.log("medal.csv created !"))

})()
