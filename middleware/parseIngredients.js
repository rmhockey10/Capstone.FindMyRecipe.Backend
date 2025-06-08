export default function parseIngredients(req, res, next) {
  const { ingredients } = req.query;

  if (!ingredients) {
    req.ingredients;
    return next();
  }

  const ingredientIds = ingredients
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id) && id > 0);

  if (ingredientIds.length === 0) {
    return res.status(400).send("Invalid ingredient query.");
  }

  req.ingredients = ingredientIds;
  next();
}
