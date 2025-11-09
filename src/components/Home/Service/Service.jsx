import React, { use } from 'react';
import ServiceCard from './ServiceCard';

const Service = ({servicePromise}) => {
    const services = use(servicePromise)
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            
            {
                services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
            }
        </div>
    );
};

export default Service;