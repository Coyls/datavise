import express from "express";
import neo4j from "neo4j-driver";
import cors from "cors";

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* use((req, resp, next) => {
  next();
}, cors({ maxAge: 84600 })); */

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

  // GET
  app.get("/test", async (req, res) => {
    const session = driver.session();

    try {
      const result = await session.run(
        "MATCH (year:Year) WHERE year.year = $year MATCH (gpd:Gpd)-[:GPD_IN_YEAR]->(year) MATCH (population:Population)-[:POPULATION_IN_YEAR]->(year) MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal) WHERE medal.type <> $type MATCH (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete:Athlete) MATCH (athlete)-[:ATHLETE_FROM_COUNTRY]->(country:Country) MATCH (gpd)-[:GPD_IN_COUNTRY]->(country) MATCH (population)-[:POPULATION_IN_COUNTRY]->(country) RETURN DISTINCT country.iso as Country, year.year as Year, count(medal) as Medals, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC",
        { year: "2016", type: "none" }
      );

      const allRecords = result.records;

      const dataTest = allRecords.map((rec) => {
        const medals = rec.get(2);

        return {
          year: rec.get(1),
          country: rec.get(0),
          medals: medals.low,
          population: rec.get(3),
          gpd: rec.get(4),
        };
      });
      res.send(dataTest);
    } finally {
      await session.close();
    }
  });

  // POST
  app.post("/testpost", async (req, res) => {
    const session = driver.session();
    try {
      const result = await session.run(
        "MATCH (year:Year) WHERE year.year = $year MATCH (gpd:Gpd)-[:GPD_IN_YEAR]->(year) MATCH (population:Population)-[:POPULATION_IN_YEAR]->(year) MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal) WHERE medal.type <> $type MATCH (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete:Athlete) MATCH (athlete)-[:ATHLETE_FROM_COUNTRY]->(country:Country) MATCH (gpd)-[:GPD_IN_COUNTRY]->(country) MATCH (population)-[:POPULATION_IN_COUNTRY]->(country) RETURN DISTINCT country.iso as Country, year.year as Year, count(medal) as Medals, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC",
        { year: req.body.year, type: "none" }
      );

      const allRecords = result.records;

      const dataTest = allRecords.map((rec) => {
        const medals = rec.get(2);

        return {
          year: rec.get(1),
          country: rec.get(0),
          medals: medals.low,
          population: rec.get(3),
          gpd: rec.get(4),
        };
      });

      res.send(dataTest);
    } finally {
      await session.close();
    }
  });

  await driver.close();
})();
