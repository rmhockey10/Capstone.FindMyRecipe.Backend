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

/**
 * Retrieves all recipes from the database.
 * @returns {Promise<Array>} An array of all recipes.
 */
export async function getRecipes() {
  const sql = `
  SELECT *
  FROM recipes
  `;
  const { rows: recipes } = await db.query(sql);
  return recipes;
}

/**
 * Retrieves a single recipe by its ID.
 * @param {number} id - The ID of the recipe to retrieve.
 * @returns {Promise<Object|undefined>} The recipe.
 */
export async function getRecipeById(id) {
  const sql = `
  SELECT *
  FROM recipes
  WHERE id = $1
  `;
  const {
    rows: [recipe],
  } = await db.query(sql, [id]);
  return recipe;
}

/**
 * Finds recipes that contain ALL of a given list of ingredients,
 * and returns the full recipe including their ingredient lists.
 * @param {string[]} ingredientNames - An array of ingredient names to search for.
 * @returns {Promise<Object[]>} An array of complete recipe objects that match.
 */
export async function getRecipeByIngredients(ingredients) {
  if (!ingredients || ingredients.length === 0) {
    return [];
  }

  const ingredientCount = ingredients.length;
  const ingredientPlaceholders = ingredients
    .map((_, i) => `$${i + 1}`)
    .join(", ");

  const sql = `
    SELECT
      recipes.*,
      ARRAY_AGG(ingredients.name) AS ingredients
    FROM
      recipes
    LEFT JOIN
      recipes_ingredients ON recipes.id = recipes_ingredients.recipes_id
    LEFT JOIN
      ingredients ON recipes_ingredients.ingredients_id = ingredients.id
    WHERE
      recipes.id IN (
        SELECT
          recipes.id
        FROM
          recipes
        JOIN
          recipes_ingredients ON recipes.id = recipes_ingredients.recipes_id
        JOIN
          ingredients ON recipes_ingredients.ingredients_id = ingredients.id
        WHERE
          ingredients.name IN (${ingredientPlaceholders})
        GROUP BY
          recipes.id
        HAVING
          COUNT(DISTINCT ingredients.id) = $${ingredientCount + 1}
      )
    GROUP BY
      recipes.id;
  `;

  const params = [...ingredients, ingredientCount];
  const {
    rows: [recipe],
  } = await db.query(sql, params);
  return recipe;
}

/**
 * Retrieves a single recipe by its ID, including a list of its ingredients.
 * @param {number} id - The ID of the recipe to retrieve.
 * @returns {Promise<Object|undefined>} The recipe object with an 'ingredients' array.
 */
export async function getRecipeByIdWithIngredients(id) {
  const sql = `
    SELECT
      recipes.*,
      ARRAY_AGG(ingredients.name) AS ingredients
    FROM
      recipes
    LEFT JOIN
      recipes_ingredients ON recipes.id = recipes_ingredients.recipes_id
    LEFT JOIN
      ingredients ON recipes_ingredients.ingredients_id = ingredients.id
    WHERE
      recipes.id = $1
    GROUP BY
      recipes.id;
  `;
  const {
    rows: [recipe],
  } = await db.query(sql, [id]);
  return recipe;
}
