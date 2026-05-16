-- https://www.postgresql.org/docs/15/tutorial-select.html
-- https://www.sjkjc.com/postgresql/describe-table/
-- https://supabase.com/dashboard/project/pbuoqklibclyjfhalnnu/auth/users

select current_database();

CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);

CREATE TABLE cities (
    name            varchar(80),
    location        point
);

INSERT INTO weather VALUES ('San Francisco', 46, 50, 0.25, '1994-11-27');
INSERT INTO cities VALUES ('San Francisco', '(-194.0, 53.0)');

INSERT INTO weather (city, temp_lo, temp_hi, prcp, date)
    VALUES ('San Francisco', 43, 57, 0.0, '1994-11-29');

INSERT INTO weather (date, city, temp_hi, temp_lo)
    VALUES ('1994-11-29', 'Hayward', 54, 37);

SELECT * FROM weather;

SELECT city, (temp_hi+temp_lo)/2 AS temp_avg, date FROM weather;

SELECT * FROM weather
    WHERE city = 'San Francisco' AND prcp > 0.0;

SELECT * FROM weather
    ORDER BY city;

SELECT * FROM weather
    ORDER BY 1;

SELECT * FROM weather
    ORDER BY city, temp_lo;

SELECT * FROM weather
    ORDER BY 1, 2;

SELECT DISTINCT city
    FROM weather;

SELECT DISTINCT city
    FROM weather
    ORDER BY city;

SELECT * FROM weather JOIN cities ON city = name;

SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather JOIN cities ON city = name;

SELECT max(temp_lo) FROM weather;

SELECT city FROM weather
    WHERE temp_lo = (SELECT max(temp_lo) FROM weather);

SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city;

SELECT city, count(*), max(temp_lo)
    FROM weather
    GROUP BY city
    HAVING max(temp_lo) < 40;

SELECT city, count(*) FILTER (WHERE temp_lo < 45), max(temp_lo)
    FROM weather
    GROUP BY city;

SELECT rolname, rolcreaterole, rolcreatedb, rolsuper FROM pg_roles WHERE rolname = 'admim';

--\l
SELECT datname FROM pg_database;

SELECT pg_database_size('mydb');

SELECT * FROM pg_tables WHERE schemaname = 'public';

SELECT
   table_name,
   column_name,
   data_type,
   column_default
FROM
   information_schema.columns
WHERE
   table_name = 'users';


SELECT name, elevation
  FROM cities
  WHERE elevation > 500;


CREATE VIEW cities AS
  SELECT name, population, elevation FROM capitals
    UNION
  SELECT name, population, elevation FROM non_capitals;

SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname) FROM empsalary;

INSERT INTO weather2 VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');

select  1 as U&"d\0061t\+000061" ;

SELECT 'foo'
'bar';

SELECT 3 OPERATOR(pg_catalog.+) 4;


SELECT ARRAY[1,2,3+4];

SELECT ARRAY[1,2,22.7]::integer[];

SELECT ARRAY[ARRAY[1,2], ARRAY[3,4]];


CREATE TABLE arr(f1 int[], f2 int[]);

INSERT INTO arr VALUES (ARRAY[[1,2],[3,4]], ARRAY[[5,6],[7,8]]);

SELECT ARRAY[f1, f2, '{{9,10},{11,12}}'::int[]] FROM arr;

SELECT ARRAY[]::integer[];

SELECT ARRAY(SELECT oid FROM pg_proc WHERE proname LIKE 'bytea%');

SELECT ROW(1,2.5,'this is a test');