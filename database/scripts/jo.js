(async () => {


    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')
    const csvFilePath = env.DATA_RAW + 'JO.csv'
    const jsonFilePath = env.DATA_JSON + 'jo.json'

    const citiesFilePath = env.DATA_JSON + 'city.json'

    const cities = require(citiesFilePath)
    const jsonArray = await csv().fromFile(csvFilePath);

    let jos = []
    let joId = 0

    jsonArray.forEach(jo => {

        const city = cities.find(city => city.name === jo.City)

        if (!city) return

        const joToPush = {
            year: parseInt(jo.Year),
            id_city: city.id,
            season: jo.Season.toLowerCase()
        }

        if (jos.findIndex(({ year, id_city, season }) => year === joToPush.year && id_city === joToPush.id_city && season === joToPush.season) === -1 && jo.Year >= 1960) {
            jos.push({ id: joId, ...joToPush })
            joId++
        }



    })

    console.log(jos.length + " jos has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(jos), () => console.log("jo.csv created !"))

})()