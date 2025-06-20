import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/Navbar";

const ProductDetail = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        );
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!product) {
    return <p className="p-6 text-center text-red-500">Product not found.</p>;
  }

  return (
    <>
      <NavBar/>
      <div className="bg-slate-300 min-h-screen p-10 flex justify-center items-center">
        <div className="p-6 max-w-4xl mx-auto  bg-white rounded-xl shadow-lg">
          <Link
            to="/"
            className="inline-block mb-4 text-blue-600 hover:underline text-sm"
          >
            ← Back to Search
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <img
              src={product.image_front_url || "https://via.placeholder.com/400"}
              alt={product.product_name}
              className="w-full h-72 object-contain rounded-lg border"
            />

            <div>
              <h1 className="text-3xl font-bold mb-2">
                {product.product_name || "Unnamed Product"}
              </h1>
              <p className="text-gray-500 mb-4">{product.brands}</p>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Ingredients:</span>{" "}
                  {product.ingredients_text || "Not available"}
                </p>

                <p>
                  <span className="font-semibold">Nutrition Grade:</span>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      product.nutrition_grades === "a"
                        ? "bg-green-500"
                        : product.nutrition_grades === "b"
                        ? "bg-yellow-500"
                        : product.nutrition_grades === "c"
                        ? "bg-orange-500"
                        : product.nutrition_grades === "d"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {product.nutrition_grades?.toUpperCase() || "N/A"}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Labels:</span>{" "}
                  {product.labels_tags?.length > 0
                    ? product.labels_tags.map((label, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-blue-100 text-blue-700 text-xs font-medium mr-2 px-2 py-1 rounded"
                        >
                          {label.replace(/_/g, " ")}
                        </span>
                      ))
                    : "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Categories:</span>{" "}
                  {product.categories || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Countries Sold:</span>{" "}
                  {product.countries || "N/A"}
                </p>

                <p>
                  <span className="font-semibold">Barcode:</span> {barcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
