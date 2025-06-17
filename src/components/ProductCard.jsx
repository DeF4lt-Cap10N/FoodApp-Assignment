


const ProductCard = ({ product }) => {
  const {
    product_name,
    image_front_small_url,
    categories,
    ingredients_text,
    nutrition_grades,
  } = product;

  return (
    <div className="border rounded-xl p-4 shadow-md bg-white">
      <img
        src={image_front_small_url || "https://via.placeholder.com/150"}
        alt={product_name}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{product_name || "xyz name"}</h2>
      <p className="text-sm text-gray-600">
        Category: {categories}
      </p>
      <p className="text-sm text-gray-500">
        Ingredients: {ingredients_text || "N/A"}
      </p>
      <p className="text-sm font-bold text-green-700">
        Nutrition Grade: {nutrition_grades?.toUpperCase() || "N/A"}
      </p>
    </div>
  );
};

export default ProductCard;
