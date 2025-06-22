
export default async function handler(req, res) {
  try {
    const response = await fetch("https://world.openfoodfacts.org/categories.json");
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
