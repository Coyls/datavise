// A DESOSSER
MATCH (year:Year) WHERE year.year = "2016"
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)-[medal:MEDAL_WIN_BY_COUNTRY]->(country:Country)
WHERE medal.type <> "none"
MATCH (year)<-[gpd:GPD_IN_YEAR]-(country)
MATCH (year)<-[budjet:BUDJET_IN_YEAR]-(country)
MATCH (year)<-[population:POPULATION_IN_YEAR]-(country)
RETURN DISTINCT country.name as Country,  year.year as Year, medal.value as Medals, medal.type as TypeMedal, budjet.value as Budjet, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC

// --------------- /medals
MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo {id:"13"})-[:JO_IN_YEAR]->(year {year: "2016"}) WHERE m.type <> "none"
RETURN n.iso as country, m.type as type, m.value as value

// --------------- /gpds
MATCH (year {year:"2016"})<-[gpd:GPD_IN_YEAR]-(country)