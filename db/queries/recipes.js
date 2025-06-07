import db from "#db/client";

/**
 * Inserts a new recipe into the database and returns the inserted recipe.
 *
 * @param {string} name - The name of the recipe.
 * @param {string} instructions - Full recipe instructions as a single string.
 * @param {number} prep_time_minutes - Time in minutes to prepare the recipe.
 * @param {number} cook_time_minutes - Time in minutes to cook the recipe.
 * @param {string} cuisine - The cuisine type (e.g. "Italian", "Mexican").
 * @param {number} servings - Number of servings the recipe yields.
 * @param {string} difficulty - Difficulty level ("Easy", "Medium", "Hard").
 * @param {number} calories_per_serving - Caloric content per serving.
 * @param {string} image - URL of the image representing the recipe.
 * @returns {Promise<Object>} The newly created recipe object from the database.
 */
export async function createRecipe(
  name,
  instructions,
  prepTimeMinutes,
  cookTimeMinutes,
  cuisine,
  servings,
  difficulty,
  caloriesPerServing,
  image
) {
  const sql = `
  INSERT INTO recipes
   (name, instructions, prep_time_minutes, cook_time_minutes, cuisine, servings, difficulty, calories_per_serving, image)
  VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING *
  `;
  const {
    rows: [recipe],
  } = await db.query(sql, [
    name,
    instructions,
    prepTimeMinutes,
    cookTimeMinutes,
    cuisine,
    servings,
    difficulty,
    caloriesPerServing,
    image,
  ]);
  return recipe;
}
