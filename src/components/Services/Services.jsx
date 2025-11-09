
import React from 'react';
import { useLoaderData } from 'react-router';
import ServiceCard from '../Home/Service/ServiceCard';

const Services = () => {
    const services = useLoaderData()
    return (
         <div className=' max-w-[1550px] mx-auto'>
          <div>
            <h1 className='text-5xl inter-font text-center font-bold my-8'>All <span className='text-gradient'>Services</span></h1>
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