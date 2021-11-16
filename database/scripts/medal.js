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

        const indexCheck = acc.findIndex(ac => (ac.type === type) && (ac.id_jo === jo.id) && (ac.id_country === country.id))

        if (indexCheck !== -1) {
            const exist = acc[indexCheck].event.find(e => e === medal.Event)
            if (!exist) {
                acc[indexCheck].value++
                acc[indexCheck].event.push(medal.Event)
            }
        } else {
            acc.push({
                id: medalId++,
                type,
                value: 0,
                id_jo: jo.id,
                id_country: country.id,
                event: []
            })
        }

        return acc

    }, [])

    const medals = medalsData.map(medal => {
        delete medal.event
        return medal
    })

    /* jsonArray.forEach(medal => {

        if (medal.Year < 1960) return

        const seasonToCheck = medal.Season

        const jo = jos.find(jo => jo.year === parseInt(medal.Year) && jo.season === seasonToCheck.toLowerCase())
        let country = countries.find(country => country.noc === medal.NOC)

        if (!country) country = { id: null }

        if (!jo) console.log(medal)



        switch (medal.Medal) {
            case 'Gold':
                break
            case 'Silver':
                break;
            case 'Bronze':
                break;
            case 'NA':
                break;
            default:
                console.log("Error type medal : " + medal.Medal);
        }


        const medalToPush = {
            id: medalId,
            type: '',
            value: 0,
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
    }) */


    console.log(medals.length + " medals has been created !")
    fs.writeFile(jsonFilePath, JSON.stringify(medals), () => console.log("medal.csv created !"))

})()
