import express from "express";
const router = express.Router();
export default router;

import {
  getRecipeById,
  getRecipeByIngredients,
  getRecipes,
} from "#db/queries/recipes";
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
