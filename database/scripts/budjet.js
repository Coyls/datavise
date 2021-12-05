(async () => {

    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')
    const csvFilePath = env.DATA_RAW + 'SPORT-BUDJET.csv'
    const jsonFilePath = env.DATA_JSON + 'budjet.json'
    const countryFilePath = env.DATA_JSON + 'country.json'

    const jsonArray = await csv().fromFile(csvFilePath);
    const countries = require(countryFilePath)

    let budjets = []
    let budjetId = 0

    jsonArray.forEach(budjet => {

        if (budjet.TYPE !== "Recreational and sporting services" || budjet.UNIT !== "Million euro") return

        const country = countries.find(country => country.name === budjet.GEO)

        if (!country) {
            return
        }

        const value = budjet.Value
        const year = budjet.TIME

        const gpdToReturn = {
            id: budjetId,
            id_country: country.id,
            year: parseInt(year),
            value
        }

        budjets.push(gpdToReturn)

        budjetId++

    })

    console.log(budjets.length + " budjets has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(budjets), () => console.log("budjet.csv created !"))

})()