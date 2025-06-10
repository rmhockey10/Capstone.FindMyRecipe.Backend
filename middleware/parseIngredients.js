// Middleware to parse and validate ?ingredients=1,2,3 or ?ingredients=5
// Converts it into a clean array of ingredient IDs and attaches it to req.ingredients

export default function parseIngredients(req, res, next) {
  const { ingredients } = req.query;

  // If no ingredients query provided, skip filtering
  if (!ingredients) {
    req.ingredients = []; // default to empty array
    return next();
  }

  // Normalize to array: split if string contains commas, otherwise wrap as array
  const raw = Array.isArray(ingredients)
    ? ingredients
    : ingredients.includes(",")
    ? ingredients.split(",")
    : [ingredients];

  // Parse and validate each ID
  const ingredientIds = raw
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id) && id > 0);

  // Reject if no valid IDs found
  if (ingredientIds.length === 0) {
    return res.status(400).send("Invalid ingredient query.");
  }

  // Attach clean array to req
  req.ingredients = ingredientIds;
  next();
}
