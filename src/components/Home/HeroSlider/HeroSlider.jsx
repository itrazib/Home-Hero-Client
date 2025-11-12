import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { motion } from "motion/react"

import { useNavigate } from "react-router";
// import { useNavigate } from "react-router-dom";

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
    <div className="relative w-full h-[50vh] overflow-hidden rounded-b-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        {/* Slide 1 */}
        {current === 0 && (
          <motion.div
            key="slide1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            {/* Left side  */}
            <div className="w-full md:w-1/2 relative flex flex-col justify-center px-6 md:px-20 py-10
                            bg-gradient-to-br from-purple-500/80 via-pink-400/70 to-orange-300/50 clip-path-diagonal md:clip-path-diagonal-left">
              
             
              <div className="absolute inset-0 bg-black/30 "></div>

              {/* Text content */}
              <div className="relative z-10">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  Professional Home Cleaning
                </motion.h1>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 text-lg opacity-90 drop-shadow-md"
                >
                  Keep your home sparkling clean with trusted local experts.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/services")}
                  className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-500 hover:border-transparent w-max"
                >
                  Explore Services
                </motion.button>
              </div>

            
              <motion.div
                className="absolute -top-10 -left-10 w-24 h-24 bg-pink-400 rounded-full opacity-30 blur-3xl"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
              />
              <motion.div
                className="absolute -bottom-10 right-10 w-32 h-32 bg-purple-400  opacity-20 blur-3xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 8 }}
              />
            </div>

            {/* Right side image */}
            <div className="w-full md:w-1/2 h-full overflow-hidden relative">
              <motion.img
                src="https://i.ibb.co/qY5rkXvz/home-clening.jpg"
                alt="Home Cleaning"
                className="w-full h-full object-cover rounded-tr-3xl md:rounded-tl-none md:rounded-br-3xl"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
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
            transition={{ duration: 1 }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 relative flex flex-col justify-center px-6 md:px-20 py-10
                            bg-gradient-to-br from-blue-500/60 via-teal-400/50 to-green-300/30 clip-path-diagonal md:clip-path-diagonal-left">
              <div className="absolute inset-0 bg-black/30 "></div>
              <div className="relative z-10">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-300 via-teal-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  Plumbing & Water Repairs
                </motion.h1>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 text-lg opacity-90 drop-shadow-md"
                >
                  Quick and reliable plumbing solutions for every home issue.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/services")}
                  className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-cyan-400 hover:to-teal-500 hover:border-transparent w-max"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full overflow-hidden relative">
              <motion.img
                src="https://i.ibb.co/pr0LFj5M/plumbing.jpg"
                alt="Plumbing"
                className="w-full h-full object-cover rounded-tr-3xl md:rounded-tl-none md:rounded-br-3xl"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
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
            transition={{ duration: 1 }}
            className="absolute w-full h-full flex flex-col md:flex-row"
          >
            <div className="w-full md:w-1/2 relative flex flex-col justify-center px-6 md:px-20 py-10
                            bg-gradient-to-br from-pink-500/60 via-purple-400/50 to-red-300/30 clip-path-diagonal md:clip-path-diagonal-left">
              <div className="absolute inset-0 bg-black/30 "></div>
              <div className="relative z-10">
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-pink-300 via-purple-400 to-red-400 bg-clip-text text-transparent drop-shadow-lg"
                >
                  Electrical & Maintenance
                </motion.h1>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 text-lg opacity-90 drop-shadow-md"
                >
                  Certified electricians ready to help at your doorstep.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/services")}
                  className="btn btn-outline border-2 border-white text-white hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500 hover:border-transparent w-max"
                >
                  Explore Services
                </motion.button>
              </div>
            </div>
            <div className="w-full md:w-1/2 h-full overflow-hidden relative">
              <motion.img
                src="https://i.ibb.co/qYchC9WN/muhammed-faizan-hussain-Qo-FTD3k-G1-QM-unsplash.jpg"
                alt="Electrical"
                className="w-full h-full object-cover rounded-tr-3xl md:rounded-tl-none md:rounded-br-3xl"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
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
