import { useState } from "react";

const BarcodeSearch = ({ onBarcodeSearch }) => {
  const [barcode, setBarcode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (barcode.trim()) onBarcodeSearch(barcode);
    setBarcode("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Enter Barcode (e.g., 737628064502)"
        className="w-full rounded-md border p-2"
      />
      <button
        type="submit"
        className="rounded-md outline-none border-none bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-700 transition"
      >
        Barcode
      </button>
    </form>
  );
};

export default BarcodeSearch;
