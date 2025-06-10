// Middleware to parse and validate ?ingredients=1,2,3 query string
// Attaches a clean array of ingredient IDs to req.ingredients
export default function parseIngredients(req, res, next) {
  const { ingredients } = req.query;

  // If no ingredients query provided, skip filtering
  if (!ingredients) {
    req.ingredients;
    return next();
  }

  // Split comma-separated values, trim, convert to integers, and filter out invalid entries
  const ingredientIds = ingredients
    .split(",")
    .map((id) => parseInt(id.trim()))
    .filter((id) => !isNaN(id) && id > 0);

  // If the input is invalid (all bad values), send 400 error
  if (ingredientIds.length === 0) {
    return res.status(400).send("Invalid ingredient query.");
  }
  // Attach the cleaned array to req for use in route handlers
  req.ingredients = ingredientIds;
  next();
}
