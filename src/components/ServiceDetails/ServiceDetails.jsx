import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);
  return (
    <div>
      <div className="max-w-[1550px] inter-font mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Left Side - Image */}
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col justify-between ">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {service.name}
            </h2>
            <p className=" mb-1">
              <span className="font-semibold text-xl ">Category:</span>{" "}
              <span className="font-medium text-gray-500">
                {" "}
                {service.category}
              </span>
            </p>
            <p className="  mb-3">
              <span className="font-semibold text-black text-xl">
                Provider:{" "}
              </span>
              <span className="font-medium text-gray-500">
                {service.providerName}
              </span>{" "}
              ({service.providerEmail})
            </p>

            <div>
              <div className="font-semibold text-xl">Description:</div>
              <p className="text-gray-700 mb-5 leading-relaxed">
                {service.description}
              </p>
            </div>

            <p className="text-2xl font-semibold text-gradient mb-6">
              Price: ${service.price}
            </p>
          </div>

          {/* Booking Button */}
          {user.email === service.providerEmail ? (
            <button disabled
            onClick={() => alert("Booking feature coming soon!")}
            className="w-full  btn-outline text-white py-3 rounded-lg font-semibold cursor-not-allowed"
          >
            Book Now
          </button>
          ) : (
            <button
              onClick={() => alert("Booking feature coming soon!")}
              className="w-full btn-outline text-white py-3 rounded-lg font-semibold "
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
