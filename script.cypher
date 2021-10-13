LOAD CSV WITH HEADERS FROM "file:///athletes.csv" AS row
CREATE (c:Athlete {name: row.name, sex: row.sex, height: row.height, wheight: row.wheight })

LOAD CSV WITH HEADERS FROM "file:///countries.csv" AS row
CREATE (c:Countries {name: row.name, noc: row.noc})