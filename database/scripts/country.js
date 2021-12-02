(async () => {


    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')


    const csvFilePath = env.DATA_RAW + 'country-codes.csv'
    const jsonFilePath = env.DATA_JSON + 'country.json'

    const jsonArray = await csv().fromFile(csvFilePath);


    let countries = jsonArray.map((country, id) => {

        const name = (country["official_name_en"] !== "") ? country["official_name_en"] : country["CLDR display name"]

        return {
            id,
            name,
            iso: country["ISO3166-1-Alpha-3"],
            noc: country.IOC,
            continent: country["Region Name"]
        }
    })


    console.log(countries.length + " countries has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(countries), () => console.log("country.csv created !"))

})()


