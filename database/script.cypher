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
CREATE (coutry:Country {noc: row.noc, name: row.name})

LOAD CSV WITH HEADERS FROM "file:///year.csv" AS row
CREATE (coutry:Year {year:row.year})

LOAD CSV WITH HEADERS FROM "file:///gpd.csv" AS row
MATCH (year:Year {year:row.year}), (country:Country {noc:row.noc})
CREATE (gpd:Gpd {id: row.id, value:row.value})
CREATE (gpd)-[:GPD_IN_YEAR]->(year)
CREATE (gpd)-[:GPD_IN_COUNTRY]->(country)

LOAD CSV WITH HEADERS FROM "file:///city.csv" AS row
MATCH (country:Country {noc:row.noc})
CREATE (city:City {id: row.id, name:row.name, lat:row.lat ,lng:row.lng})
CREATE (city)-[:GPD_IN_COUNTRY]->(country)

LOAD CSV WITH HEADERS FROM "file:///season.csv" AS row
CREATE (season:Season {season: row.season})

LOAD CSV WITH HEADERS FROM "file:///sport.csv" AS row
CREATE (sport:Sport {id: row.id, name:row.name})

LOAD CSV WITH HEADERS FROM "file:///event.csv" AS row
MATCH (sport:Sport {id: row.id_sport})
CREATE (event:Event {id: row.id, name:row.name})
CREATE (event)-[:EVENT_IN_SPORT]->(sport)

LOAD CSV WITH HEADERS FROM "file:///jo.csv" AS row
MATCH (year:Year {year: row.year}),(city:City {id: row.id_city}),(season:Season {season: row.season})
CREATE (jo:Jo {id: row.id})
CREATE (jo)-[:JO_IN_SEASON]->(season)
CREATE (jo)-[:JO_IN_YEAR]->(year)
CREATE (jo)-[:JO_IN_CITY]->(city)

LOAD CSV WITH HEADERS FROM "file:///athlete_1.csv" AS row
MATCH (country:Country {noc:row.noc})
CREATE (athlete:Athlete {id: row.id, name:row.name, sex: row.sex, height: row.height, wheight: row.wheight, team: row.team})
CREATE (athlete)-[:ATHLETE_FROM_COUNTRY]->(country)

LOAD CSV WITH HEADERS FROM "file:///athlete_2.csv" AS row
MATCH (country:Country {noc:row.noc})
CREATE (athlete:Athlete {id: row.id, name:row.name, sex: row.sex, height: row.height, wheight: row.wheight, team: row.team})
CREATE (athlete)-[:ATHLETE_FROM_COUNTRY]->(country)

LOAD CSV WITH HEADERS FROM "file:///medal_1.csv" AS row
MATCH (jo:Jo {id: row.id_jo}),(event:Event {id: row.id_event}),(athlete:Athlete {id: row.id_athlete})
CREATE (medal:Medal {id: row.id, type: row.type})
CREATE (medal)-[:MEDAL_IN_JO]->(jo)
CREATE (medal)-[:MEDAL_IN_EVENT]->(event)
CREATE (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete)

LOAD CSV WITH HEADERS FROM "file:///medal_2.csv" AS row
MATCH (jo:Jo {id: row.id_jo}),(event:Event {id: row.id_event}),(athlete:Athlete {id: row.id_athlete})
CREATE (medal:Medal {id: row.id, type: row.type})
CREATE (medal)-[:MEDAL_IN_JO]->(jo)
CREATE (medal)-[:MEDAL_IN_EVENT]->(event)
CREATE (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete)

LOAD CSV WITH HEADERS FROM "file:///medal_3.csv" AS row
MATCH (jo:Jo {id: row.id_jo}),(event:Event {id: row.id_event}),(athlete:Athlete {id: row.id_athlete})
CREATE (medal:Medal {id: row.id, type: row.type})
CREATE (medal)-[:MEDAL_IN_JO]->(jo)
CREATE (medal)-[:MEDAL_IN_EVENT]->(event)
CREATE (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete)

LOAD CSV WITH HEADERS FROM "file:///age.csv" AS row
MATCH (athlete:Athlete {id:row.id_athlete}),(year:Year {year:row.year})
CREATE (age:Age {id: row.id, age: row.age})
CREATE (age)-[:AGE_IN_YEAR]->(year)
CREATE (age)-[:AGE_OF_ATHLETE]->(athlete)










