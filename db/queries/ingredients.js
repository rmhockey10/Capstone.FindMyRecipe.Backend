import db from "#db/client";

/**
 * Inserts a new ingredient into the database if it doesn't already exist.
 *
 * @param {string} name - The name of the ingredient to be added.
 * @returns {Promise<Object|null>} The newly created ingredient object, or null if the ingredient already exists.
 */
export async function createIngredient(name) {
  const sql = `
  INSERT INTO ingredients
    (name)
  VALUES
    ($1)
  ON CONFLICT
    (name)
    DO NOTHING
  RETURNING *
  `;
  const {
    rows: [ingredient],
  } = await db.query(sql, [name]);
  return ingredient;
}
