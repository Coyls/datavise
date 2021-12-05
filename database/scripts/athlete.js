
(async () => {

    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')

    const csvFilePath = env.DATA_RAW + 'JO.csv'
    const countriesFilePath = env.DATA_JSON + 'country.json'
    const josFilePath = env.DATA_JSON + 'jo.json'
    const jsonFilePath = env.DATA_JSON + 'athlete.json'


    const countries = require(countriesFilePath)
    const jos = require(josFilePath)
    const jsonArray = await csv().fromFile(csvFilePath);

    let athletes = []
    let athleteId = 0

    let start = 1960


    while (start <= 2020) {
        const allAthleteAtYear = jsonArray.filter(a => a.Year === start.toString())
        let dataAthlete = []

        allAthleteAtYear.forEach(athlete => {
            const country = countries.find(country => athlete.NOC === country.noc)

            if (!country) return

            dataAthlete.push({
                id: athlete.ID,
                id_country: country.id,
                year: athlete.Year,
                season: athlete.Season
            })
        })

        let eachAthlete = dataAthlete.reduce((uniqueAthlete, athlete) => {
            const check = uniqueAthlete.findIndex(c => (athlete.id === c.id) && (athlete.season === c.season))
            if (check === -1) uniqueAthlete.push(athlete)
            return uniqueAthlete
        }, [])


        const athleteByJo = eachAthlete.reduce((totalAthlete, athlete) => {
            const year = parseInt(athlete.year)
            let season = athlete.season
            season = season.toLowerCase()
            const id_country = athlete.id_country

            const jo = jos.find(jo => (jo.year === year) && (jo.season === season))

            const check = totalAthlete.findIndex(c => (c.id_jo === jo.id) && (c.id_country === id_country))
            check !== -1 ? totalAthlete[check].nb_athlete++ : totalAthlete.push({ id: athleteId++, id_country, nb_athlete: 1, id_jo: jo.id })


            return totalAthlete


        }, [])


        athletes = [...athletes, ...athleteByJo]
        start++
    }

    console.log(athletes.length + " athletes has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(athletes), () => console.log("athletes_1.csv created !"))


})()

