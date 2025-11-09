import React from "react";

const CustomerReview = () => {
  return (
    <div>
      <section className="py-16 bg-gradient-to-r from-purple-100 via-pink-50 to-orange-100">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-700 mb-4">
                "Amazing service! My home has never been cleaner. Highly
                recommend their team."
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=1"
                  alt="Customer"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Sarah Johnson</p>
                  <p className="text-gray-500 text-sm">Homeowner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-700 mb-4">
                "Fast and reliable plumbing service. Very satisfied with the
                professionalism."
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=2"
                  alt="Customer"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Mark Wilson</p>
                  <p className="text-gray-500 text-sm">Apartment Owner</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <p className="text-gray-700 mb-4">
                "Electricians arrived on time and did a perfect job. Will hire
                again!"
              </p>
              <div className="flex items-center justify-center gap-4">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=3"
                  alt="Customer"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Emily Davis</p>
                  <p className="text-gray-500 text-sm">Homeowner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerReview;
