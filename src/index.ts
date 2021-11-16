import express from "express";
import neo4j from "neo4j-driver";
import cors from "cors";
import { IMedal, IGpd, IPopulation } from "./types";

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
  res.send("Root Api");
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
  app.get("/medals", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo)-[:JO_IN_YEAR]->(year:Year {year: $year}) RETURN n.iso as country, m.gold as gold, m.silver as silver , m.bronze as bronze, m.none as none, m.total as total",
        { year }
      );
      const allRecords = result.records;
      const medals: IMedal[] = allRecords.map((rec) => {
        return {
          country: rec.get(0) as string,
          gold: parseInt(rec.get(1)),
          silver: parseInt(rec.get(2)),
          bronze: parseInt(rec.get(3)),
          none: parseInt(rec.get(4)),
          total: parseInt(rec.get(5)),
        };
      });
      res.send(medals);
    } finally {
      await session.close();
    }
  });

  app.get("/gpds", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (year:Year {year:$year})<-[gpd:GPD_IN_YEAR]-(n:Country) RETURN n.iso as country, gpd.value as gpd",
        { year }
      );
      const allRecords = result.records;
      const gpds: IGpd[] = allRecords.map((rec) => {
        return {
          country: rec.get(0) as string,
          gpd: parseInt(rec.get(1)),
        };
      });
      res.send(gpds);
    } finally {
      await session.close();
    }
  });

  app.get("/populations", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (year:Year {year:$year})<-[population:POPULATION_IN_YEAR]-(n:Country) RETURN n.iso as country, population.value as population",
        { year }
      );
      const allRecords = result.records;
      const populations: IPopulation[] = allRecords.map((rec) => {
        return {
          country: rec.get(0) as string,
          population: parseInt(rec.get(1)),
        };
      });
      res.send(populations);
    } finally {
      await session.close();
    }
  });

  await driver.close();
})();
