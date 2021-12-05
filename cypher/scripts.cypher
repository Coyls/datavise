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
MATCH (n:Country)-[p:POPULATION_IN_YEAR]->(year:Year {year:"2016"})
MATCH (jo:Jo)-[j:JO_IN_SEASON]->(s:Season)
RETURN n.iso as country, m.total as total, p.value as population, s.season as season