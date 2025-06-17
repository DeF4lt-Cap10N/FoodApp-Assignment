import { useState } from "react";

const BarcodeSearch = ({ onBarcodeSearch }) => {
  const [barcode, setBarcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBarcodeSearch(barcode);
    setBarcode("");
  };
  

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        className="w-full p-2 border rounded-md"
        placeholder="Enter Barcode (e.g., 737628064502)"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md"
      >
        Search Barcode
      </button>
    </form>
  );
};

export default BarcodeSearch;
