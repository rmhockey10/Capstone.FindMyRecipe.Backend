import express from "express";
const router = express.Router();
export default router;

import {
  getRecipeById,
  getRecipeByIngredients,
  getRecipes,
  createRecipe,
  getRecipeByIdWithIngredie,
} from "#db/queries/recipes";
import { createIngredient } from "#db/queries/ingredients";
import { createRecipeIngredient } from "#db/queries/recipes_ingredients";
import parseIngredients from "#middleware/parseIngredients";

// GET /recipes
// Returns recipes that include all selected ingredient IDs
router.route("/").get(parseIngredients, async (req, res) => {
  const recipes = await getRecipeByIngredients(req.ingredients);

  if (!recipes) {
    return res.status(404).send("No recipes found.");
  }

  res.send(recipes);
});

// Preload a single recipe by :id
// Attaches the recipe to req.recipe if found, or sends 404
router.param("id", async (req, res, next, id) => {
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(404).send("recipe not found.");
  req.recipe = recipe;
  next();
});

// GET /recipes/:id
// Returns a single recipe (preloaded by router.param)
router.route("/:id").get((req, res) => {
  res.send(req.recipe);
});

// GET /recipes
// Returns all recipes in the database
// IS a stretch goal put it in just in case we use it
router.route("/").get(async (req, res) => {
  const recipes = await getRecipes();

  if (!recipes) {
    return res.status(404).send("No recipes found.");
  }

  res.send(recipes);
});

router.post("/recipes", async (req, res, next) => {
  try {
    const {
      name,
      instructions,
      prepTimeMinutes,
      cookTimeMinutes,
      cuisine,
      servings,
      difficulty,
      caloriesPerServing,
      image,
      ingredients, // array of strings
    } = req.body;

    const newRecipe = await createRecipe(
      name,
      JSON.stringify(instructions),
      prepTimeMinutes,
      cookTimeMinutes,
      cuisine,
      servings,
      difficulty,
      caloriesPerServing,
      image
    );

    for (const ingredientName of ingredients) {
      const ingredient = await createIngredient(ingredientName);
      await createRecipeIngredient(newRecipe.id, ingredient.id);
    }

    // Retrieve full recipe with all linked ingredients
    const fullRecipe = await getRecipeByIdWithIngredie(newRecipe.id);

    res.status(201).json(fullRecipe);
  } catch (err) {
    next(err);
  }
});
