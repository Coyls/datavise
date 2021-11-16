(async () => {

    const csv = require('csvtojson')
    const fs = require('fs')
    const { env } = require('process')

    const csvFilePath = env.DATA_RAW + 'JO.csv'
    const jsonFilePath = env.DATA_JSON + 'medal.json'

    const josFilePath = env.DATA_JSON + 'jo.json'
    const countriesFilePath = env.DATA_JSON + 'country.json'

    const jos = require(josFilePath)
    const countries = require(countriesFilePath)
    const jsonArray = await csv().fromFile(csvFilePath);

    let medalId = 0

    const medalsData = jsonArray.reduce((acc, medal) => {
        if (medal.Year < 1960) return acc

        const seasonToCheck = medal.Season

        const jo = jos.find(jo => jo.year === parseInt(medal.Year) && jo.season === seasonToCheck.toLowerCase())
        const country = countries.find(country => country.noc === medal.NOC)

        if (!country) return acc

        const rawTypeMedal = medal.Medal

        const type = (rawTypeMedal === 'NA') ? "none" : rawTypeMedal.toLowerCase()

        const indexCheck = acc.findIndex(ac => (ac.id_jo === jo.id) && (ac.id_country === country.id))

        if (indexCheck !== -1) {
            const exist = acc[indexCheck].event.find(e => (e.event === medal.Event) && (e.type === type))
            if (!exist) {
                if (type !== "none") acc[indexCheck].total++
                acc[indexCheck][type]++
                acc[indexCheck].event.push({
                    event: medal.Event,
                    type
                })
            }
        } else {

            const itemToPush = {
                id: medalId++,
                gold: 0,
                silver: 0,
                bronze: 0,
                none: 0,
                total: 0,
                id_jo: jo.id,
                id_country: country.id,
                event: []
            }

            itemToPush[type]++
            if (type !== "none") itemToPush.total++

            itemToPush.event.push({
                event: medal.Event,
                type
            })

            acc.push(itemToPush)

        }

        return acc

    }, [])

    const medals = medalsData.map(medal => {
        delete medal.event
        return medal
    })

    console.log(medals.length + " medals has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(medals), () => console.log("medal.csv created !"))

})()
