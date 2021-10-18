MATCH (year:Year) WHERE year.year = "2016" // Param 
MATCH (gpd:Gpd)-[:GPD_IN_YEAR]->(year)
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)<-[:MEDAL_IN_JO]-(medal:Medal)
WHERE medal.type <> "none"
MATCH (medal)-[:MEDAL_WIN_BY_ATHLETE]->(athlete:Athlete)
MATCH (athlete)-[:ATHLETE_FROM_COUNTRY]->(country:Country)
MATCH (gpd)-[:GPD_IN_COUNTRY]->(country)
RETURN DISTINCT country.name, count(medal), gpd.value