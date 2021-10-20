import express from "express";
import neo4j from 'neo4j-driver'

const app = express()

app.get('/', function (req, res) {
    res.send('hello world')
})

app.listen(3000)


// const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic("neo4j", "password"))
// const session = driver.session()

// try {
//     const result = await session.run(
//         'MATCH (a:Medal {type: $type}) RETURN a',
//         { type: "gold" }
//     )

//     const singleRecord = result.records[0]
//     const node = singleRecord.get(0)

//     console.log(node.properties.name)
// } finally {
//     await session.close()
// }

// // on application exit:
// await driver.close()