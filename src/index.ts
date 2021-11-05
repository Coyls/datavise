import express from "express";
import neo4j from "neo4j-driver";

const app = express();
const port = 3000 || process.env.PORT;

console.log(process.env.NODE_ENV);

app.get("/", (req, res) => {
  res.send("Test");
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

(async () => {
  const driver = neo4j.driver(
    "bolt://neo4j:7687",
    neo4j.auth.basic(process.env.USER_NEO4J, process.env.MDP_NEOJ4)
  );
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (year:Year) WHERE year.year = $year MATCH (gpd:Gpd)-[:GPD_IN_YEAR]->(year) MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal) WHERE medal.type <> $type MATCH (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete:Athlete) MATCH (athlete)-[:ATHLETE_FROM_COUNTRY]->(country:Country) MATCH (gpd)-[:GPD_IN_COUNTRY]->(country) RETURN DISTINCT country.name as Country, year.year as Year, count(medal) as Medals, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC ",
      { year: "2016", type: "none" }
    );

    const singleRecord = result.records[0];
    const allRecords = result.records;
    const node = singleRecord.get(0);

    app.get("/test", (req, res) => {
      res.send(allRecords);
    });

    console.log(node.properties);
  } finally {
    await session.close();
  }

  // on application exit:
  await driver.close();

  /* 
        "start": "node -r dotenv/config ./server/index.js",
        "dev": "nodemon -r dotenv/config ./server/index.js",
        */
})();
