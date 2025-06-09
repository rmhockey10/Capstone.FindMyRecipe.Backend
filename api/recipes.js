import express from "express";
const router = express.Router();
export default router;

import { getRecipeById, getRecipesByIngredients } from "#db/queries/recipes";
import parseIngredients from "#middleware/parseIngredients";

router.route("/").get(parseIngredients, async (req, res) => {
  const recipes = await getRecipesByIngredients(req.ingredients);

  if (!recipes) {
    return res.status(404).send("No recipes found.");
  }

  res.send(recipes);
});

router.param("id", async (req, res, next, id) => {
  const recipe = await getRecipeById(id);
  if (!recipe) return res.status(404).send("recipe not found.");
  req.recipe = recipe;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.recipe);
});
