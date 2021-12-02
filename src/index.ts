import express from "express";
import neo4j from "neo4j-driver";
import cors from "cors";
import {
  IMedal,
  IGpd,
  IPopulation,
  IGpdByPopulation,
  IMedalsAndBudjet,
  IAthletesByContinent,
  IGpdsContinentsRaw,
  IGpdsContinent,
  IYearGpd,
} from "./types";

const app = express();
const port = 3000 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

  // ---------- /medals
  app.get("/medals", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    const season = req.query?.season ? req.query.season : "all";
    try {
      const result = await session.run(
        "MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo)-[:JO_IN_YEAR]->(year:Year {year: $year}) MATCH (jo:Jo)-[j:JO_IN_SEASON]->(s:Season) RETURN n.iso as country, m.total as total, s.season as season",
        { year }
      );
      const allRecords = result.records;

      const filteredRecords =
        season === "all"
          ? allRecords
          : allRecords.filter((rec) => rec.get(2) === season);

      const medals: IMedal[] = filteredRecords.map((rec) => {
        const total = parseInt(rec.get(1));

        return {
          country: rec.get(0) as string,
          total,
        };
      });
      res.send(medals);
    } finally {
      await session.close();
    }
  });

  // ---------- /gpds
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

  // ---------- /gpd-by-population
  app.get("/gpd-by-population", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (y:Year {year : $year})<-[r:POPULATION_IN_YEAR]-(c:Country) MATCH (y:Year {year : $year})<-[z:GPD_IN_YEAR]-(c:Country) RETURN DISTINCT c.iso as country, r.value as population, z.value as gpd",
        { year }
      );
      const allRecords = result.records;
      const gpdByPopulation: IGpdByPopulation[] = allRecords.map((rec) => {
        const population = parseInt(rec.get(1));
        const gpd = parseInt(rec.get(2));
        const gpdByPopulation = Math.ceil(gpd / population);
        return {
          country: rec.get(0) as string,
          gpdByPopulation,
          population,
        };
      });
      res.send(gpdByPopulation);
    } finally {
      await session.close();
    }
  });

  // ---------- /populations
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

  // ---------- /medals-and-budjet
  app.get("/medals-and-budjet", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (y:Year {year : $year})<-[r:BUDJET_IN_YEAR]-(c:Country) MATCH (y:Year {year : $year})<-[:JO_IN_YEAR]-(jo:Jo)<-[medals:MEDAL_WIN_BY_COUNTRY]-(c:Country) RETURN DISTINCT c.name as country, r.value as budjet, medals.total as medals",
        { year }
      );
      const allRecords = result.records;
      const medalsAndBudjet: IMedalsAndBudjet[] = allRecords.map((rec) => {
        const budjetRaw = rec.get(1);
        const medals = parseInt(rec.get(2));

        const budjet = parseFloat(budjetRaw.replace(",", ""));

        return {
          country: rec.get(0) as string,
          budjet,
          medals,
        };
      });
      res.send(medalsAndBudjet);
    } finally {
      await session.close();
    }
  });

  // ---------- /athletes-by-continent
  app.get("/athletes-by-continent", async (req, res) => {
    const session = driver.session();
    const year = req.query?.year ? req.query.year : "2016";
    try {
      const result = await session.run(
        "MATCH (y:Year {year : $year})<-[:JO_IN_YEAR]-(jo:Jo)<-[athlete:ATHLETE_FROM_COUNTRY]-(c:Country) RETURN DISTINCT c.continent as continent, sum(athlete.value) as nbAthlete",
        { year }
      );
      const allRecords = result.records;
      const athletesByContinent: IAthletesByContinent[] = allRecords.map(
        (rec) => {
          const continent = rec.get(0) === "" ? "unknown" : rec.get(0);
          const nbAthlete = rec.get(1);

          return {
            continent,
            nbAthlete: nbAthlete.low,
          };
        }
      );
      res.send(athletesByContinent);
    } finally {
      await session.close();
    }
  });

  // ---------- /gpd-continent
  app.get("/gpd-continent", async (req, res) => {
    const session = driver.session();
    try {
      const result = await session.run(
        "MATCH (y:Year)<-[g:GPD_IN_YEAR]-(c:Country) RETURN c.continent as continent, y.year as year, g.value as value",
        {}
      );
      const allRecords = result.records;

      const gpdsContinentsRaw: IGpdsContinentsRaw[] = allRecords.map((rec) => {
        return {
          year: parseInt(rec.get(1)),
          continent: rec.get(0) as string,
          gpd: parseInt(rec.get(2)),
        };
      });

      const packData: IGpdsContinent[] = gpdsContinentsRaw.reduce(
        (acc, item) => {
          if (!isNaN(item.gpd)) {
            const exist = acc.find((part) => part.continent === item.continent);
            console.log("item.gpd:", item.gpd);

            exist
              ? exist.values.push({
                  year: item.year,
                  gpd: item.gpd,
                })
              : acc.push({
                  continent: item.continent,
                  values: [
                    {
                      year: item.year,
                      gpd: item.gpd,
                    },
                  ],
                });
          }

          return acc;
        },
        []
      );

      const reducedData: IGpdsContinent[] = packData.map((continent) => {
        const reducedContinent: IYearGpd[] = continent.values.reduce(
          (acc: IYearGpd[], item) => {
            const yearGpd: IYearGpd = acc.find((y) => y.year === item.year);

            yearGpd
              ? (yearGpd.gpd = yearGpd.gpd + item.gpd)
              : acc.push({
                  year: item.year,
                  gpd: item.gpd,
                });

            return acc;
          },
          []
        );

        return {
          continent: continent.continent,
          values: reducedContinent,
        };
      });

      const gpdContinent = reducedData.map((item) => {
        item.values.sort((a, b) => a.year - b.year);
        return item;
      });

      res.send(gpdContinent);
    } finally {
      await session.close();
    }
  });

  await driver.close();
})();
