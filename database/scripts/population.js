(async () => {


    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')

    const csvFilePath = env.DATA_RAW + 'POP.csv'
    const jsonFilePath = env.DATA_JSON + 'population.json'
    const countryFilePath = env.DATA_JSON + 'country.json'

    const jsonArray = await csv().fromFile(csvFilePath);
    const countries = require(countryFilePath)

    let populations = []
    let populationId = 0

    jsonArray.forEach(pop => {

        let range = 1960

        const country = countries.find(country => country.iso === pop.iso)

        if (!country) return


        while (range !== 2021) {

            const value = (pop[range] === "") ? null : pop[range]

            const popToReturn = {
                id: populationId,
                id_country: country.id,
                year: range,
                value
            }

            populations.push(popToReturn)

            range++
            populationId++
        }
    })

    console.log(populations.length + " populations has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(populations), () => console.log("population.csv created !"))

})()
