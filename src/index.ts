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
    neo4j.auth.basic("neo4j", "tocos74")
  );
  const session = driver.session();

  try {
    const result = await session.run("MATCH (city:City) RETURN city", {});

    const singleRecord = result.records[0];
    const allRecords = result.records;
    const node = singleRecord.get(0);

    app.get("/test", (req, res) => {
      res.send(allRecords);
    });

    console.log(node.properties.name);
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