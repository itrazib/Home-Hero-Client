
import HeroSlider from "./HeroSlider/HeroSlider";
import CustomerReview from "../CustomerReview/CustomerReview";

import Service from "./Service/Service";
import { useNavigate } from "react-router";

const Home = () => {
    const Navigate = useNavigate()
  return (
    <div className="max-w-[1550px] mx-auto ">
      <HeroSlider></HeroSlider>
      <div>
    
            <Service ></Service>
       <div className="flex justify-center my-5">
         <button onClick={() => Navigate('/services')} className="btn-primary ">Show All</button>
       </div>
      </div>
      <CustomerReview></CustomerReview>
    </div>
  );
};

export default Home;
