
import React, { useEffect, useState } from 'react';

import ServiceCard from '../Home/Service/ServiceCard';
import PriceFilter from './PriceFilter';

const Services = () => {

  const [services, setServices] = useState([])
  const[loading, setLoading] = useState(true)
    

  useEffect(() => {
    fetch('http://localhost:5000/services')
    .then(res => res.json())
    .then(data => {
      setServices(data)
      setLoading(false)
    })
  },[])

    const handleFilter = (min, max) => {
      setLoading(true)
    fetch(`http://localhost:5000/filter?minPrice=${min}&maxPrice=${max}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setServices(data)
        setLoading(false)
      });
  };

  if(loading){
    return (
      <div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-3 text-gradient text-lg font-semibold">
            Loading...
          </p>
        </div>
    )
  }
    return (
         <div className=' max-w-[1550px] mx-auto'>
          <div>
            <h1 className='text-5xl inter-font text-center font-bold my-8'>All <span className='text-gradient'>Services</span></h1>

            <PriceFilter onFilter={handleFilter}></PriceFilter>

          </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
         </div>
    );
};

export default Services;