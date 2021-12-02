(async () => {


    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')
    const csvFilePath = env.DATA_RAW + 'GPD.csv'
    const jsonFilePath = env.DATA_JSON + 'gpd.json'
    const countryFilePath = env.DATA_JSON + 'country.json'

    const jsonArray = await csv().fromFile(csvFilePath);
    const countries = require(countryFilePath)

    let gpds = []
    let gpdId = 0

    jsonArray.forEach(gpd => {

        let range = 1960

        const country = countries.find(country => country.iso === gpd.NOC)

        if (!country) return


        while (range !== 2021) {

            const value = (gpd[range] === "") ? null : gpd[range]

            const gpdToReturn = {
                id: gpdId,
                id_country: country.id,
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

})()