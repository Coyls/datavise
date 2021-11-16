// Liste des pays avec leur nombre de medail gagner et leur pib pour une année 

MATCH (year:Year) WHERE year.year = "2016"
MATCH (gpd:Gpd)-[:GPD_IN_YEAR]->(year)
MATCH (population:Population)-[:POPULATION_IN_YEAR]->(year)
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal)
WHERE medal.type <> "none"
MATCH (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete:Athlete)
MATCH (athlete)-[:ATHLETE_FROM_COUNTRY]->(country:Country)
MATCH (gpd)-[:GPD_IN_COUNTRY]->(country)
MATCH (population)-[:POPULATION_IN_COUNTRY]->(country)
RETURN DISTINCT country.name as Country, year.year as Year, count(medal) as Medals, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC


MATCH (year:Year) WHERE year.year = "2016"
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal)-[:MEDAL_WIN_BY_COUNTRY]->(country:Country)
WHERE medal.type <> "none"
MATCH (year)<-[gpd:GPD_IN_YEAR]-(country)
MATCH (year)<-[budjet:BUDJET_IN_YEAR]-(country)
MATCH (population)-[:POPULATION_IN_COUNTRY]->(country)
RETURN DISTINCT country.name as Country, year.year as Year, count(medal) as Medals, population.value as Population, gpd.gpd as GPD ORDER BY toInteger(gpd.value) DESC


// Final
MATCH (year:Year) WHERE year.year = "2016"
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)-[medal:MEDAL_WIN_BY_COUNTRY]->(country:Country)
WHERE medal.type <> "none"
MATCH (year)<-[gpd:GPD_IN_YEAR]-(country)
MATCH (year)<-[budjet:BUDJET_IN_YEAR]-(country)
MATCH (year)<-[population:POPULATION_IN_YEAR]-(country)
RETURN DISTINCT country.name as Country,  year.year as Year, medal.value as Medals, medal.type as TypeMedal, budjet.value as Budjet, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC

