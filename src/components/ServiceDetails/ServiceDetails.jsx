import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const { user } = useContext(AuthContext);
  const bookModal = useRef();
  const reviewModal = useRef();
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });
  console.log(user.displayName)

  // Fetch Service Details
  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Error fetching details:", err));
  }, [id]);

  // Booking
  const handleSubmitBooking = (e) => {
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
      headers: { "Content-Type": "application/json" },
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
          e.target.reset();
          bookModal.current.close();
        }
      });
  };

  // Open Review Modal
  const handleReviewModal = () => {
    reviewModal.current.showModal();
  };

  // Submit Review
  const handleSubmitReview = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/services/${id}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail: user.email,
        name: user.displayName,
        rating: reviewData.rating,
        comment: reviewData.comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Review added successfully!", "success");
          reviewModal.current.close();
          setReviewData({ rating: 5, comment: "" });
          // Refresh service details to show new review
          fetch(`http://localhost:5000/services/${id}`)
            .then((res) => res.json())
            .then((data) => setService(data));
        }
      });
  };

  return (
    <div className="max-w-[1550px] inter-font mx-auto mt-10">
      {/* Service Details */}
      <div className="bg-white rounded-2xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{service.name}</h2>
            <p className="mb-1">
              <span className="font-semibold text-xl">Category:</span>{" "}
              <span className="font-medium text-gray-500">{service.category}</span>
            </p>
            <p className="mb-3">
              <span className="font-semibold text-black text-xl">Provider: </span>
              <span className="font-medium text-gray-500">{service.providerName}</span>{" "}
              ({service.providerEmail})
            </p>
            <div>
              <div className="font-semibold text-xl">Description:</div>
              <p className="text-gray-700 mb-5 leading-relaxed">{service.description}</p>
            </div>
            <p className="text-2xl font-semibold text-gradient mb-6">Price: ${service.price}</p>
          </div>

          {/* Booking Button */}
          {user.email === service.providerEmail ? (
            <button
              disabled
              className="w-full btn-outline text-white py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              Book Now
            </button>
          ) : (
            <>
              <button
                onClick={() => bookModal.current.showModal()}
                className="w-full btn-outline text-white py-3 rounded-lg font-semibold mb-4"
              >
                Book Now
              </button>
              <button
                onClick={handleReviewModal}
                className="w-[150px] btn-outline py-3 rounded-lg font-semibold"
              >
                Add Review
              </button>
            </>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <dialog ref={bookModal} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h2 className="text-xl font-semibold text-center text-gradient mb-4">Book Your Service</h2>
          <form onSubmit={handleSubmitBooking} className="space-y-5">
            <input type="email" name="email" defaultValue={user.email} readOnly className="hidden"/>
            <input type="text" name="serviceId" defaultValue={id} className="hidden"/>
            <div>
              <label className="text-sm font-medium text-gray-600">Booking Date</label>
              <input type="date" name="bookingDate" className="w-full p-2 border rounded-md" required/>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Price</label>
              <input type="number" name="price" defaultValue={service.price} className="w-full p-2 border rounded-md" required/>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button type="button" className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50" onClick={() => bookModal.current.close()}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-white rounded-md btn-outline bg-indigo-500 hover:bg-indigo-600">
                Submit Booking
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Review Modal */}
      <dialog ref={reviewModal} className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h2 className="text-xl font-semibold text-center text-gradient mb-4">Add Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-600">Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Comment</label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Write your review here"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button type="button" className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50" onClick={() => reviewModal.current.close()}>
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-white rounded-md btn-outline bg-green-500 hover:bg-green-600">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Display Reviews */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Reviews</h3>
        {service.reviews && service.reviews.length > 0 ? (
          service.reviews.map((r, i) => (
            <div key={i} className="border border-gray-300 p-3 rounded mb-3">
              <p><strong>{r.name}</strong> rated: ⭐ {r.rating}</p>
              <p>{r.comment}</p>
              <p className="text-sm text-gray-400">{new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
