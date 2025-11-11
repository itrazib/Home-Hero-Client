import React, { useState } from 'react';

const PriceFilter = ({onFilter}) => {
     const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

     const handleSubmit = (e) => {
    e.preventDefault();
    console.log("fuilter")
    onFilter(minPrice, maxPrice); 
  };
    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-3 mt-5">
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="border rounded-lg p-2 w-32"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="border rounded-lg p-2 w-32"
      />
      <button
        type="submit"
        className="btn-outline text-white px-4 py-2 rounded-lg"
      >
        Filter
      </button>
    </form>
    );
};

export default PriceFilter;