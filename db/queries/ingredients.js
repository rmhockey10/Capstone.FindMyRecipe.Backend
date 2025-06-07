import db from "#db/client";

/**
 * Inserts a new ingredient into the database if it doesn't already exist.
 *
 * @param {string} name - The name of the ingredient to be added.
 * @returns {Promise<Object|null>} The newly created ingredient object, or null if the ingredient already exists.
 */
export async function createIngredient(name) {
  const insertSql = `
  INSERT INTO ingredients
    (name)
  VALUES
    ($1)
  ON CONFLICT
    (name)
    DO NOTHING
  `;
  await db.query(insertSql, [name]);

  const selectSql = `
  SELECT *
  FROM ingredients
  Where
  name = $1
  `;
  const {
    rows: [ingredient],
  } = await db.query(selectSql, [name]);
  return ingredient;
}
