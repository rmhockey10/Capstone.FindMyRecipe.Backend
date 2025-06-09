import express from "express";
const router = express.Router();
export default router;

import { getIngredients, getIngredientById } from "#db/queries/ingredients";

// GET /ingredients
// Returns a list of all ingredients in the database
router.route("/").get(async (req, res) => {
  const ingredients = await getIngredients();

  if (!ingredients) return res.status(404).send("No ingredients found.");

  res.send(ingredients);
});

// Preload ingredient by :id
// Fetches the ingredient and attaches it to req.ingredient
// Sends 404 if the ingredient does not exist
router.param("id", async (req, res, next, id) => {
  const ingredient = await getIngredientById(id);
  if (!ingredient) return res.status(404).send("Ingredient not found.");

  req.ingredient = ingredient;
  next();
});

// GET /ingredients/:id
// Returns a single ingredient that was preloaded by router.param
router.route("/:id").get((req, res) => {
  res.send(req.ingredient);
});
