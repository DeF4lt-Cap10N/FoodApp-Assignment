import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for food..."
        className="w-full rounded-md border p-2"
      />
      <button
        type="submit"
        className="rounded-md bg-cyan-500 px-4 py-2 mr-5 text-white hover:bg-cyan-700 transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
