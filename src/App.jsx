import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";

import SearchBar from "./components/SearchBar";

import BarcodeSearch from "./components/BarcodeSearch";

function App() {
  const [products, setProducts] = useState([]);

  //Search Function
  const fetchData = async (name = "") => {
    const res = await axios.get(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&json=true`
    );
    setProducts(res.data.products.slice(0, 20)); // first load 0 to 20 items
  };


  //Barcode function
  const searchByBarcode = async (barcode) => {
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );

      if (res.data.status === 1) {
        setProducts([res.data.product]);
      } else {
        alert("Product not found for that barcode!");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching product by barcode:", error);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Food Explorer 
      </h1>
      <SearchBar onSearch={fetchData} />
      <BarcodeSearch onBarcodeSearch={searchByBarcode} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
