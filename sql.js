var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("./gold_medals.sqlite");

/*
Returns a SQL query string that will create the Country table with four columns: name (required), code (required), gdp, and population.
*/

const createCountryTable = () => {
  return "CREATE TABLE Country (name varchar(255) NOT NULL, code varchar(255) NOT NULL, gdp int, population int)";
};

/*
Returns a SQL query string that will create the GoldMedal table with ten columns (all required): id, year, city, season, name, country, gender, sport, discipline, and event.
*/

const createGoldMedalTable = () => {
  return "CREATE TABLE GoldMedal (id int PRIMARY KEY, year int NOT NULL, city varchar(255) NOT NULL, season varchar(255) NOT NULL, name varchar(255) NOT NULL, country varchar(255) NOT NULL, gender varchar(255) NOT NULL, sport varchar(255) NOT NULL, discipline varchar(255) NOT NULL, event varchar(255) NOT NULL)";
};

/*
Returns a SQL query string that will find the number of gold medals for the given country.
*/

const goldMedalNumber = (country) => {
  return `SELECT COUNT(*) FROM GoldMedal AS count WHERE count.country = '${country}'`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most summer medals, along with the number of medals aliased to 'count'.
*/

const mostSummerWins = (country) => {
  return `SELECT year,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  AND season = 'Summer'
  GROUP BY year
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most winter medals, along with the number of medals aliased to 'count'.
*/

const mostWinterWins = (country) => {
  return `SELECT year,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  AND season = 'Winter'
  GROUP BY year
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the year where the given country 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestYear = (country) => {
  return `SELECT year,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  GROUP BY year
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the discipline this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestDiscipline = (country) => {
  return `SELECT discipline,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  GROUP BY discipline
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the sport this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestSport = (country) => {
  return `SELECT sport,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  GROUP BY sport
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the event this country has 
won the most medals, along with the number of medals aliased to 'count'.
*/

const bestEvent = (country) => {
  return `SELECT event,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  GROUP BY event
  ORDER BY count DESC
  LIMIT 1`;
};

/*
Returns a SQL query string that will find the number of male medalists.
*/

const numberMenMedalists = (country) => {
  return `SELECT COUNT(DISTINCT name)
  AS count
  FROM GoldMedal
  WHERE gender = 'Men'
  AND country = '${country}'`;
};

/*
Returns a SQL query string that will find the number of female medalists.
*/

const numberWomenMedalists = (country) => {
  return `SELECT COUNT(DISTINCT name)
  AS count
  FROM GoldMedal
  WHERE gender = 'Women'
  AND country = '${country}'`;
};

/*
Returns a SQL query string that will find the athlete with the most medals.
*/

const mostMedaledAthlete = (country) => {
  return `SELECT name,
  COUNT(id) AS count
  FROM GoldMedal
  WHERE country = '${country}'
  GROUP BY name
  ORDER BY count DESC
  LIMIT 1`;
};

/* helper functions for getting order by statement by field and direction */
const getOrdered = (field, sortAscending) => {
  if (field) {
    if (sortAscending) {
      return `ORDER BY ${field} ASC;`;
    } else {
      return `ORDER BY ${field} DESC;`;
    }
  }
  return "";
};

/*
Returns a SQL query string that will find the medals a country has won
optionally ordered by the given field in the specified direction.
*/

const orderedMedals = (country, field, sortAscending) => {
  let ordered = getOrdered(field, sortAscending);
  return `SELECT *
  FROM GoldMedal
  WHERE country = '${country}' ${ordered}`;
};

/*
Returns a SQL query string that will find the sports a country has
won medals in. It should include the number of medals, aliased as 'count',
as well as the percentage of this country's wins the sport represents,
aliased as 'percent'. Optionally ordered by the given field in the specified direction.
*/

const orderedSports = (country, field, sortAscending) => {
  let ordered = getOrdered(field, sortAscending);
  return `SELECT sport,
COUNT(*) AS count,
COUNT(*) * 100.0 / sum(COUNT(*)) OVER() AS percent,
country
FROM GoldMedal
WHERE country = '${country}'
GROUP BY sport
${ordered}`;
};

module.exports = {
  createCountryTable,
  createGoldMedalTable,
  goldMedalNumber,
  mostSummerWins,
  mostWinterWins,
  bestDiscipline,
  bestSport,
  bestYear,
  bestEvent,
  numberMenMedalists,
  numberWomenMedalists,
  mostMedaledAthlete,
  orderedMedals,
  orderedSports,
};
