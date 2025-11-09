import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({service}) => {
    const {_id, name, image, price, category} = service;
    return (
       <div className="my-5 bg-white rounded-2xl shadow-md overflow-hidden  hover:shadow-lg transition-all">
      {/* Image */}
      <div className="h-52 bg-gray-200 ">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Sale badge */}
        <span className="inline-block text-xs px-3 py-1 bg-purple-100 text-purple-600 rounded-full mb-2 font-medium">
          {category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">
          {name} 
        </h3>

        {/* Price */}
        <p className="text-purple-600 font-semibold text-lg mt-2">
          $ {price} 
        </p>

        {/* Button */}
       <Link to={`/service-details/${_id}`}>
        <button className="w-full mt-4 py-2 btn-outline rounded-lg hover:bg-purple-600 hover:text-white transition-all">
          View Details
        </button>
       </Link>
      </div>
    </div>
    );
};

export default ServiceCard;