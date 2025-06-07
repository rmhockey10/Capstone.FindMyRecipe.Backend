import db from "#db/client";
import { createUser } from "#db/queries/users";
import { createIngredient } from "#db/queries/ingredients";
import { createRecipe } from "#db/queries/recipes";
import { createRecipeIngredient } from "#db/queries/recipes_ingredients";

import recipeData from "#db/recipes.json" assert { type: "json" };

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  await createUser("foo", "bar");
}
