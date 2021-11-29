// A DESOSSER
MATCH (year:Year) WHERE year.year = "2016"
MATCH (year)<-[:JO_IN_YEAR]-(jo:Jo)-[medal:MEDAL_WIN_BY_COUNTRY]->(country:Country)
WHERE medal.type <> "none"
MATCH (year)<-[gpd:GPD_IN_YEAR]-(country)
MATCH (year)<-[budjet:BUDJET_IN_YEAR]-(country)
MATCH (year)<-[population:POPULATION_IN_YEAR]-(country)
RETURN DISTINCT country.name as Country,  year.year as Year, medal.value as Medals, medal.type as TypeMedal, budjet.value as Budjet, population.value as Population, gpd.value as GPD ORDER BY toInteger(gpd.value) DESC

// --------------- /medals OBSOLETE
MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo)-[:JO_IN_YEAR]->(year:Year {year: "2016"})
RETURN n.iso as country, m.gold as gold, m.silver as silver , m.bronze as bronze, m.none as none, m.total as total

// --------------- /gpds
MATCH (year:Year {year:"2016"})<-[gpd:GPD_IN_YEAR]-(n:Country)
RETURN n.iso as country, gpd.value as gpd

// --------------- /populations
MATCH (year:Year {year:"2016"})<-[population:POPULATION_IN_YEAR]-(n:Country)
RETURN n.iso as country, population.value as population

// --------------- /gpds-by-population
MATCH (y:Year {year : "2016"})<-[r:POPULATION_IN_YEAR]-(c:Country)
MATCH (y:Year {year : "2016"})<-[z:GPD_IN_YEAR]-(c:Country)
RETURN DISTINCT c.name as country, r.value as population, z.value as gpd

// --------------- /medals-and-budjet
MATCH (y:Year {year : "2016"})<-[r:BUDJET_IN_YEAR]-(c:Country)
MATCH (y:Year {year : "2016"})<-[:JO_IN_YEAR]-(jo:Jo)<-[medals:MEDAL_WIN_BY_COUNTRY]-(c:Country) 
RETURN DISTINCT c.name as country, r.value as budjet, medals.total as medals

// --------------- /athletes-by-continent
MATCH (y:Year {year : "2016"})<-[:JO_IN_YEAR]-(jo:Jo)<-[athlete:ATHLETE_FROM_COUNTRY]-(c:Country)
RETURN DISTINCT c.continent as continent, sum(athlete.value) as nbAthlete

// --------------- /gpd-europe
MATCH (y:Year)<-[z:GPD_IN_YEAR]-(c:Country {continent: "Europe"})
RETURN c.name as country, y.year as year, z.value as value 

// --------------- /medals
MATCH (n:Country)-[m:MEDAL_WIN_BY_COUNTRY]->(jo:Jo)-[:JO_IN_YEAR]->(year:Year {year: "2016"})
MATCH (n:Country)-[z:GPD_IN_YEAR]->(y:Year {year : "2016"})
MATCH (jo:Jo)-[j:JO_IN_SEASON]->(s:Season)
RETURN n.iso as country, m.total as total, z.value as population, s.season as season