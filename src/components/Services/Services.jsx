import React, { useEffect, useState } from "react";

import ServiceCard from "../Home/Service/ServiceCard";
import PriceFilter from "./PriceFilter";
import Loader from "../Loader/Loader";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      });
  }, []);

  const handleFilter = (min, max) => {
    setLoading(true);
    fetch(`http://localhost:5000/filter?minPrice=${min}&maxPrice=${max}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setServices(data);
        setLoading(false);
      });
  };

  const handleSearch = () => {
    fetch(`http://localhost:5000/search?search=${search}`)
    .then(res => res.json())
    .then(data => {
      setServices(data)
    })

  }

  return (
    <div className=" max-w-[1550px] mx-auto">
      <title>Services</title>
      <div>
        <h1 className="text-5xl inter-font text-center font-bold my-8">
          All <span className="text-gradient">Services</span>
        </h1>

        <div className="flex flex-col-reverse lg:flex-row justify-between items-center ">
          <PriceFilter onFilter={handleFilter}></PriceFilter>
          <div className="flex">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input  type="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} required placeholder="Search" />
            </label>
            <button onClick={handleSearch} className="btn-outline text-white px-4 py-2 rounded-lg ml-3">Search</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, i) => <Loader key={i} />)
          : services.map((service) => (
              <ServiceCard key={service._id} service={service}></ServiceCard>
            ))}
      </div>
    </div>
  );
};

export default Services;
