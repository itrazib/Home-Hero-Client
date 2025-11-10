import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState([]);
  const { user } = useContext(AuthContext);
  const bookModal = useRef();

  const handleBookModal = () => {
    bookModal.current.showModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const serviceId = e.target.serviceId.value;
    const price = e.target.price.value;
    const bookingDate = e.target.bookingDate.value;
    const newBooking = {
      serviceId,
      serviceName: service.name,
      category: service.category,
      email,
      price,
      bookingDate,
    };
    fetch("http://localhost:5000/my-booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Booking Successful!",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset()
          bookModal.current.close()
        }
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);
  return (
    <div>
      <div className="max-w-[1550px] inter-font mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* Left Side - Image */}
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col justify-between ">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {service.name}
            </h2>
            <p className=" mb-1">
              <span className="font-semibold text-xl ">Category:</span>{" "}
              <span className="font-medium text-gray-500">
                {" "}
                {service.category}
              </span>
            </p>
            <p className="  mb-3">
              <span className="font-semibold text-black text-xl">
                Provider:{" "}
              </span>
              <span className="font-medium text-gray-500">
                {service.providerName}
              </span>{" "}
              ({service.providerEmail})
            </p>

            <div>
              <div className="font-semibold text-xl">Description:</div>
              <p className="text-gray-700 mb-5 leading-relaxed">
                {service.description}
              </p>
            </div>

            <p className="text-2xl font-semibold text-gradient mb-6">
              Price: ${service.price}
            </p>
          </div>

          {/* Booking Button */}
          {user.email === service.providerEmail ? (
            <button
              disabled
              onClick={() => alert("Booking feature coming soon!")}
              className="w-full  btn-outline text-white py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Book Now
            </button>
          ) : (
            <>
              <button
                onClick={handleBookModal}
                className="w-full btn-outline text-white py-3 rounded-lg font-semibold "
              >
                Book Now
              </button>

              <dialog ref={bookModal} id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-2xl">
                  <h2 className="text-xl font-semibold text-center text-gradient mb-4">
                    Book Your Service
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        User Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        defaultValue={user.email}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Service ID
                      </label>
                      <input
                        type="text"
                        name="serviceId"
                        placeholder="Enter Service ID"
                        defaultValue={id}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Booking Date
                      </label>
                      <input
                        type="date"
                        name="bookingDate"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        onClick={() => bookModal.current.close()}
                        type="button"
                        className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2  text-white rounded-md btn-outline"
                      >
                        Submit Booking
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
