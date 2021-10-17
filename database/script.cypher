CREATE CONSTRAINT ageIdConstraint ON (c:Age) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT athleteIdConstraint ON (c:Athlete) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT cityIdConstraint ON (c:City) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT countryIdConstraint ON (c:Country) ASSERT c.noc IS UNIQUE;
CREATE CONSTRAINT eventIdConstraint ON (c:Event) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT gpdIdConstraint ON (c:Gpd) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT joIdConstraint ON (c:Jo) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT medalIdConstraint ON (c:Medal) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT seasonIdConstraint ON (c:Season) ASSERT c.season IS UNIQUE;
CREATE CONSTRAINT sportIdConstraint ON (c:Sport) ASSERT c.id IS UNIQUE;
CREATE CONSTRAINT yearIdConstraint ON (c:Year) ASSERT c.year IS UNIQUE;


LOAD CSV WITH HEADERS FROM "file:///country.csv" AS row
// CREATE (coutry:Country {name: row.country, noc: row.noc})


LOAD CSV WITH HEADERS FROM "file:///athlete.csv" AS row
// MATCH (country:Country) WHERE country.name = row.team 
// MERGE (athlete:Athlete {name: row.name, sex: row.sex, height: row.height, wheight: row.wheight })
// CREATE (athlete)-[:IN_TEAM]->(coutry)




