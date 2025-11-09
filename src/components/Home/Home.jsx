
import HeroSlider from "./HeroSlider/HeroSlider";
import CustomerReview from "../CustomerReview/CustomerReview";

import Service from "./Service/Service";
import { Navigate, useNavigate } from "react-router";
import { Suspense } from "react";

const servicePromise = fetch("http://localhost:5000/service").then((res) =>
  res.json()
);

const Home = () => {
    const Navigate = useNavigate()
  return (
    <div className="max-w-[1550px] mx-auto ">
      <HeroSlider></HeroSlider>
      <div>
        
        <h1 className="text-gradient text-5xl inter-font text-center font-bold mt-10 mb-6">
          Service
        </h1>
      
        <Suspense fallback={<p className="flex justify-center items-center"><span className="loading loading-bars loading-xl "></span></p>}>
            <Service servicePromise={servicePromise}></Service>
        </Suspense>
       <div className="flex justify-center my-5">
         <button onClick={() => Navigate('/services')} className="btn-primary ">Show All</button>
       </div>
      </div>
      <CustomerReview></CustomerReview>
    </div>
  );
};

export default Home;
