import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createIngredient } from "#db/queries/ingredients";
import { createRecipe } from "#db/queries/recipes";
import { createRecipeIngredient } from "#db/queries/recipes_ingredients";

import recipesData from "./recipes.json" with { type: "json" };

const recipes = recipesData;

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

/**
 * Seeds the database with an initial user and a list of recipes with their associated ingredients.
 *
 * - Creates a default user (`foo` / `bar`).
 * - Iterates through each recipe:
 *    - Inserts the recipe into the `recipes` table.
 *    - Inserts each ingredient into the `ingredients` table (ignoring duplicates).
 *    - Links each recipe to its ingredients via the `recipes_ingredients` join table.
 *
 * @returns {Promise<void>} Resolves when seeding is complete.
 */
async function seed() {
  await createUser("foo", "bar");
  for (const recipe of recipes) {
    const newRecipe = await createRecipe(
      recipe.name,
      JSON.stringify(recipe.instructions),
      recipe.prepTimeMinutes,
      recipe.cookTimeMinutes,
      recipe.cuisine,
      recipe.servings,
      recipe.difficulty,
      recipe.caloriesPerServing,
      recipe.image
    );
    for (const ingredientName of recipe.ingredients) {
      const ingredient = await createIngredient(ingredientName);

      await createRecipeIngredient(newRecipe.id, ingredient.id);
    }
  }
}
