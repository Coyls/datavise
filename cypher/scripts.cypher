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
