// CREATE INDEX FOR (c:City) ON (c.id);
// CREATE INDEX FOR (c:Country) ON (c.id);
// CREATE INDEX FOR (c:Gpd) ON (c.id); 
// CREATE INDEX FOR (c:Population) ON (c.id); 
// CREATE INDEX FOR (c:Jo) ON (c.id);
// CREATE INDEX FOR (c:Medal) ON (c.id);
// CREATE INDEX FOR (c:Season) ON (c.season); 
// CREATE INDEX FOR (c:Year) ON (c.year);

// CREATE CONSTRAINT medalIdConstraint ON (c:Medal) ASSERT c.id IS UNIQUE;

CREATE CONSTRAINT cityIdConstraint ON (c:City) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT countryIdConstraint ON (c:Country) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT joIdConstraint ON (c:Jo) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT seasonIdConstraint ON (c:Season) ASSERT c.season IS UNIQUE; 
CREATE CONSTRAINT yearIdConstraint ON (c:Year) ASSERT c.year IS UNIQUE;

LOAD CSV WITH HEADERS FROM "file:///country.csv" AS row
CREATE (coutry:Country {id: row.id, name : row.name, iso: row.iso, noc: row.noc})

LOAD CSV WITH HEADERS FROM "file:///year.csv" AS row
CREATE (coutry:Year {year:row.year})

LOAD CSV WITH HEADERS FROM "file:///gpd.csv" AS row
MATCH (year:Year {year:row.year}), (country:Country {id:row.id_country})
CREATE (country)-[:GPD_IN_YEAR {value:row.value}]->(year)

LOAD CSV WITH HEADERS FROM "file:///budjet.csv" AS row
MATCH (year:Year {year:row.year}), (country:Country {id:row.id_country})
CREATE (country)-[:BUDJET_IN_YEAR {value:row.value}]->(year)

LOAD CSV WITH HEADERS FROM "file:///population.csv" AS row
MATCH (year:Year {year:row.year}), (country:Country {id:row.id_country})
CREATE (country)-[:POPULATION_IN_YEAR {value:row.value}]->(year)

LOAD CSV WITH HEADERS FROM "file:///city.csv" AS row
MATCH (country:Country {id:row.id_country})
CREATE (city:City {id: row.id, name:row.name, lat:row.lat ,lng:row.lng})
CREATE (city)-[:CITY_IN_COUNTRY]->(country)

LOAD CSV WITH HEADERS FROM "file:///season.csv" AS row
CREATE (season:Season {season: row.season})

LOAD CSV WITH HEADERS FROM "file:///jo.csv" AS row
MATCH (year:Year {year: row.year}),(city:City {id: row.id_city}),(season:Season {season: row.season})
CREATE (jo:Jo {id: row.id})
CREATE (jo)-[:JO_IN_SEASON]->(season)
CREATE (jo)-[:JO_IN_YEAR]->(year)
CREATE (jo)-[:JO_IN_CITY]->(city)

LOAD CSV WITH HEADERS FROM "file:///athlete.csv" AS row
MATCH (jo:Jo {id:row.id_jo}),(country:Country {id:row.id_country})
CREATE (country)-[:ATHLETE_FROM_COUNTRY {value:row.nb_athlete}]->(jo)

LOAD CSV WITH HEADERS FROM "file:///medal.csv" AS row
MATCH (jo:Jo {id:row.id_jo}),(country:Country {id:row.id_country})
CREATE (jo)<-[:MEDAL_WIN_BY_COUNTRY { gold:row.gold, silver:row.silver, bronze:row.bronze, none:row.none, total:row.total }]-(country)













