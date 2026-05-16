CREATE VIEW myview AS
    SELECT name, temp_lo, temp_hi, prcp, date, location
        FROM weather, cities
        WHERE city = name;

SELECT * FROM myview;

CREATE TABLE cities2 (
        name     varchar(80) primary key,
        location point
);

CREATE TABLE weather2 (
        city      varchar(80) references cities2(name),
        temp_lo   int,
        temp_hi   int,
        prcp      real,
        date      date
);

INSERT INTO weather2 VALUES ('Berkeley', 45, 53, 0.0, '1994-11-28');

CREATE TABLE capitals (
  name       text,
  population real,
  elevation  int,    -- (in ft)
  state      char(2)
);

CREATE TABLE non_capitals (
  name       text,
  population real,
  elevation  int     -- (in ft)
);

CREATE VIEW cities AS
  SELECT name, population, elevation FROM capitals
    UNION
  SELECT name, population, elevation FROM non_capitals;


SELECT name, elevation
  FROM cities
  WHERE elevation > 500;