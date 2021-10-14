LOAD CSV WITH HEADERS FROM "file:///country.csv" AS row
CREATE (coutry:Country {name: row.country, noc: row.noc})


LOAD CSV WITH HEADERS FROM "file:///athlete.csv" AS row
MATCH (country:Country) WHERE country.name = row.team 
MERGE (athlete:Athlete {name: row.name, sex: row.sex, height: row.height, wheight: row.wheight })
CREATE (athlete)-[:IN_TEAM]->(coutry)




