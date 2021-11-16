import express from "express";
import neo4j from "neo4j-driver";
import cors from "cors";
import { IMedals } from "./types";

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
        "MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo)-[:JO_IN_YEAR]->(year:Year {year: $year}) WHERE m.type <> 'none' RETURN year.year as year, n.iso as country, m.type as type, m.value as value",
        { year, type: "none" }
      );

      const allRecords = result.records;

      const medals: IMedals[] = allRecords.map((rec) => {
        return {
          year: rec.get(0) as string,
          country: rec.get(1) as string,
          type: rec.get(2) as string,
          value: rec.get(3) as string,
        };
      });
      res.send(medals);
    } finally {
      await session.close();
    }
  });

  await driver.close();
})();
