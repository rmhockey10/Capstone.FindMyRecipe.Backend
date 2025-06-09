import express from "express";
const router = express.Router();
export default router;

import { getAllIngredients, getIngredientById } from "#db/queries/ingredients";

router.route("/").get(async (req, res) => {
  const ingredients = await getAllIngredients();

  if (!ingredients) return res.status(404).send("No ingredients found.");

  res.send(ingredients);
});

router.param("id", async (req, res, next, id) => {
  const ingredient = await getIngredientById(id);
  if (!ingredient) return res.status(404).send("Ingredient not found.");

  req.ingredient = ingredient;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.ingredient);
});
