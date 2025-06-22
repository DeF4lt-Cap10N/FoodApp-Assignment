import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from "./components/ProductCard";
import axios from "axios";

import SearchBar from "./components/SearchBar";
import BarcodeSearch from "./components/BarcodeSearch";
import CategoryFilter from "./components/CateforyFilter";
import NavBar from "./components/Navbar";

function App() {
  const [products, setProducts] = useState([]);
  const [sortType, setSortType] = useState("");
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 

  const fetchData = async (name = "", pageNum = 1) => {
    setLoader(true);
    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${name}&page=${pageNum}&page_size=20&json=true`
      );

      const fetchedProducts = res.data.products;

      if (pageNum === 1) {
        setProducts(fetchedProducts);
      } else {
        setProducts((prev) => [...prev, ...fetchedProducts]);
      }

      setHasMore(fetchedProducts.length > 0);
      setPage(pageNum);
      setSearchTerm(name); 
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoader(false);
  };

  // Barcode 
  const searchByBarcode = async (barcode) => {
    try {
      setLoader(true);
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      if (res.data.status === 1) {
        setProducts([res.data.product]);
        setHasMore(false);
      } else {
        alert("Product not found for that barcode!");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching product by barcode:", error);
    }
    setLoader(false);
  };

  // Category 
  const fetchByCategory = async (categoryId) => {
    const category = categoryId.replace("en:", "");
    try {
      setLoader(true);
      const res = await axios.get(
        `https://thingproxy.freeboard.io/fetch/https://world.openfoodfacts.org/category/${category}.json`
      );
      setProducts(res.data.products);
      setHasMore(false); 
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  
  const observer = useRef();

  const lastProductRef = useCallback(
    (e) => {
      if (loader) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchData(searchTerm, page + 1);
        }
      });
      if (e) observer.current.observe(e);
    },
    [loader, hasMore, page, searchTerm]
  );

 
  let sortedProducts = [...products];
  if (sortType === "name-asc") {
    sortedProducts.sort((a, b) =>
      (a.product_name || "").localeCompare(b.product_name || "")
    );
  } else if (sortType === "name-desc") {
    sortedProducts.sort((a, b) =>
      (b.product_name || "").localeCompare(a.product_name || "")
    );
  } else if (sortType === "grade-asc") {
    sortedProducts.sort((a, b) =>
      (a.nutrition_grades || "z").localeCompare(b.nutrition_grades || "z")
    );
  } else if (sortType === "grade-desc") {
    sortedProducts.sort((a, b) =>
      (b.nutrition_grades || "a").localeCompare(a.nutrition_grades || "a")
    );
  }

  return (
    <div className="pt-2 pb-16 px-4 md:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 min-h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-10">
        <SearchBar onSearch={(term) => fetchData(term, 1)} />
        <BarcodeSearch onBarcodeSearch={searchByBarcode} />
        <select
          className="p-3 border-none rounded-xl bg-white/80 backdrop-blur-md shadow-md text-sm font-medium mb-6 outline-none"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="name-asc">Name (A to Z)</option>
          <option value="name-desc">Name (Z to A)</option>
          <option value="grade-asc">Nutrition Grade (A to E)</option>
          <option value="grade-desc">Nutrition Grade (E to A)</option>
        </select>
      </div>

      <CategoryFilter onSelectCategory={fetchByCategory} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 mt-8">
        {sortedProducts.map((product, idx) => {
          if (idx === sortedProducts.length - 1) {
            return (
              <div ref={lastProductRef} key={idx}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={idx} product={product} />;
          }
        })}
      </div>

      {loader && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
}

export default App;
