--CREATE EXTENSION IF NOT EXISTS vector;
SHOW server_version;


--createdb mydb;

SELECT current_user;
select  current_database();
select  current_schema();
select current_query();
select current_time;
SELECT current_date;

CREATE DATABASE mydb;
SELECT version();


CREATE TABLE weather (
    city            varchar(80),
    temp_lo         int,           -- low temperature
    temp_hi         int,           -- high temperature
    prcp            real,          -- precipitation
    date            date
);