import { useEffect, useState } from "react";
import axios from "axios";

const CategoryFilter = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res =await axios.get("https://corsproxy.io/?https://world.openfoodfacts.org/categories.json");

        const categories = res.data.tags?.slice(0, 10) || [];

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Top Categories</h2>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="flex overflow-x-auto gap-3 scrollbar">
          {categories.map((cat, index) => (
            <button
              key={cat.id || index}
              onClick={() => onSelectCategory(cat.id)}
              className="whitespace-nowrap px-4 py-2 bg-white border border-gray-300 rounded-full text-sm hover:bg-gray-200 transition"
            >
              {cat.name || cat.id}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
