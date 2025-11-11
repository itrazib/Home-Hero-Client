
import HeroSlider from "./HeroSlider/HeroSlider";
import CustomerReview from "../CustomerReview/CustomerReview";

import Service from "./Service/Service";
import { useNavigate } from "react-router";
import { Suspense } from "react";

const servicePromise = fetch("http://localhost:5000/service")
.then((res) =>res.json());

const Home = () => {
    const Navigate = useNavigate()
  return (
    <div className="max-w-[1550px] mx-auto ">
      <HeroSlider></HeroSlider>
      <div>
        
        <h1 className="text-gradient text-5xl inter-font text-center font-bold mt-10 mb-6">
          Service
        </h1>
      
        <Suspense fallback={<div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
                  <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                  <p className="mt-3 text-gradient text-lg font-semibold">
                    Loading...
                  </p>
                </div>}>
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
