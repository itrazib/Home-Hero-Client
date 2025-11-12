import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import Loader from "../../Loader/Loader";



const Service = () => {
  const [topServices, setTopServices] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:5000/top-rated")
      .then((res) => res.json())
      .then((data) => {
        setTopServices(data)
        setLoading(false)
      })
      .catch((err) => console.error("Error fetching top services:", err));
  }, []);

  // if(loading){
  //   return (
  //       <div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
  //                 <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
  //                 <p className="mt-3 text-gradient text-lg font-semibold">
  //                   Loading...
  //                 </p>
  //               </div>
  //   )
  // }

  return (
    <div className="max-w-[1550px] mx-auto mt-10 inter-font">
      <h2 className="text-4xl font-bold text-center mb-8">
        Top Rated <span className="text-gradient">Services</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        { loading
    ? Array(6)
        .fill(0)
        .map((_, i) => <Loader key={i} />)
        :topServices.length > 0 ? (
          topServices.map((service) => (
            <ServiceCard key={service._id} service={service}>
              <div className="mt-2 text-sm text-yellow-500">
                ⭐ {service.avgRating.toFixed(1)}
              </div>
            </ServiceCard>
          ))
        ) : (
          <p className="text-center col-span-3">No top rated services yet.</p>
        )}
      </div>
    </div>
  );
};

export default Service;
