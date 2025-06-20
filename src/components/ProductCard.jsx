import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    product_name,
    image_front_small_url,
    categories,
    ingredients_text,
    nutrition_grades,
    code,
  } = product;

  return (
    <Link
      to={`/product/${code}`}
      className="group relative block bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={image_front_small_url || "https://via.placeholder.com/150"}
          alt={product_name || "Product image"}
          className="w-full h-40 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <h2 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
        {product_name || "Unnamed Product"}
      </h2>

      {categories && (
        <p className="text-sm text-indigo-700 font-medium mb-1 truncate">
          {categories}
        </p>
      )}

      {ingredients_text && (
        <p className="text-sm text-gray-600 mb-1 line-clamp-2">
          <strong className="text-gray-800">Ingredients:</strong>{" "}
          {ingredients_text}
        </p>
      )}

      <p className="text-xs text-gray-500 mb-1">
        <span className="font-medium">Barcode:</span> {code}
      </p>

      <p className="text-sm text-green-600 font-semibold">
        Nutrition Grade: {nutrition_grades?.toUpperCase() || "N/A"}
      </p>
    </Link>
  );
};

export default ProductCard;
