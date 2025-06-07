DROP TABLE IF EXISTS recipes_ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE recipes (
id serial PRIMARY KEY,
name text NOT NULL,
instructions text NOT NULL,
prep_time_minutes integer NOT NULL,
cook_time_minutes integer NOT NULL,
cuisine text NOT NULL,
servings integer NOT NULL,
difficulty text NOT NULL,
calories_per_serving integer NOT NULL,
image text
);

CREATE TABLE ingredients (
  id serial PRIMARY KEY,
  name text NOT NULL UNIQUE
);

CREATE TABLE recipes_ingredients (
  recipes_id integer NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredients_id integer NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  PRIMARY KEY(recipes_id, ingredients_id)
);