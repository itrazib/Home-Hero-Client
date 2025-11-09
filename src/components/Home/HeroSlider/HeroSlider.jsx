import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";


const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden rounded-b-2xl shadow-xl ">
      <AnimatePresence mode="wait">
        {/* Slide 1 */}
        {current === 0 && (
          <motion.div
            key="slide1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            {/* Left side: text with gradient */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10 text-white 
                            bg-gradient-to-b from-black/80 via-black/50 to-black/30">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent"
              >
                Professional Home Cleaning
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 text-lg opacity-90"
              >
                Keep your home sparkling clean with trusted local experts.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/services")}
                className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 hover:border-transparent w-max"
              >
                Explore Services
              </motion.button>
            </div>

            {/* Right side: image */}
            <div className="w-full md:w-1/2 h-full">
              <img
                src="https://i.ibb.co/qY5rkXvz/home-clening.jpg"
                alt="Home Cleaning"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Slide 2 */}
        {current === 1 && (
          <motion.div
            key="slide2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10 text-white 
                            bg-gradient-to-b from-black/80 via-black/50 to-black/30">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent"
              >
                Plumbing & Water Repairs
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 text-lg opacity-90"
              >
                Quick and reliable plumbing solutions for every home issue.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/services")}
                className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 hover:border-transparent w-max"
              >
                Explore Services
              </motion.button>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <img
                src="https://i.ibb.co/pr0LFj5M/plumbing.jpg"
                alt="Plumbing"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}

        {/* Slide 3 */}
        {current === 2 && (
          <motion.div
            key="slide3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10 text-white 
                            bg-gradient-to-b from-black/80 via-black/50 to-black/30">
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent"
              >
                Electrical & Maintenance
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-6 text-lg opacity-90"
              >
                Certified electricians ready to help at your doorstep.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/services")}
                className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-violet-500 hover:to-pink-500 hover:border-transparent w-max"
              >
                Explore Services
              </motion.button>
            </div>
            <div className="w-full md:w-1/2 h-full">
              <img
                src="https://i.ibb.co/qYchC9WN/muhammed-faizan-hussain-Qo-FTD3k-G1-QM-unsplash.jpg"
                alt="Electrical"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots navigation */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition ${
              i === current ? "bg-white scale-110" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
