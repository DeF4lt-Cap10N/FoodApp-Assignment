import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";

import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState([]);

  const fetchData = async (name="") => {
    const res = await axios.get(
       `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&json=true`
    );
    setProducts(res.data.products.slice(0, 20)); // first load 0 to 20 items
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Food Explorer 🍟
      </h1>
      <SearchBar onSearch={fetchData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
