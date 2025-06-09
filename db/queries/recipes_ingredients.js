import db from "#db/client";

/**
 * Creates an association between a recipe and an ingredient in the join table.
 *
 * @param {number} recipeId - The ID of the recipe.
 * @param {number} ingredientId - The ID of the ingredient.
 * @returns {Promise<Object>} The newly created record from the recipes_ingredients join table.
 */
export async function createRecipeIngredient(recipeId, ingredientId) {
  const sql = `
  INSERT INTO recipes_ingredients
    (recipes_id, ingredients_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [recipeIngredient],
  } = await db.query(sql, [recipeId, ingredientId]);
  return recipeIngredient;
}
