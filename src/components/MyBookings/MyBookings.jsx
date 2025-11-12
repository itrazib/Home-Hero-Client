import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBooking, setMyBooking] = useState([]);
  const reviewModal = useRef();
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch My Bookings
  useEffect(() => {
    fetch(`http://localhost:5000/my-booking?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyBooking(data));
  }, [user.email]);

  // Delete booking
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/my-booking/${_id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire("Deleted!", "Your booking has been deleted.", "success");
              setMyBooking(myBooking.filter((b) => b._id !== _id));
            }
          });
      }
    });
  };

  // Open review modal
  const handleReviewModal = (booking) => {
    setSelectedBooking(booking);
    reviewModal.current.showModal();
  };

  // Submit Review
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.ratings.value;
    const comment = form.comment.value;

    const newReview = {
      userEmail: user.email,
      name: user.displayName,
      rating,
      comment,
    };

    fetch(`http://localhost:5000/services/${selectedBooking.serviceId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Review added successfully!", "success");
          reviewModal.current.close();
          setSelectedBooking(null);
          form.reset();
        }
      });
  };

  return (
    <div className="max-w-[1550px] mx-auto inter-font px-3 sm:px-6 lg:px-10"> 
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mt-10 mb-7"> 
        My <span className="text-gradient">Bookings</span>
      </h1>

      <div className="overflow-x-auto"> 
        <table className="table  text-sm sm:text-base"> 
          <thead>
            <tr className="text-xs sm:text-sm lg:text-base"> 
              <th>SL NO</th>
              <th>Name</th>
              <th>Service</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myBooking.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-500"> 
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar hidden sm:block"> 
                      <div className="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12"> 
                        <img
                          src={
                            user.photoURL ||
                            "https://i.ibb.co/Kz0jptXW/profile.jpg"
                          }
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-xs sm:text-sm md:text-base">
                        {user.displayName}
                      </div>
                      <div className="text-[10px] sm:text-xs opacity-50">Bangladesh</div>
                    </div>
                  </div>
                </td>
                <td className="text-xs sm:text-sm md:text-base">
                  {booking.serviceName}
                </td>
                <td className="text-xs sm:text-sm md:text-base">
                  {booking.category}
                </td>
                <td className="text-xs sm:text-sm md:text-base">
                  $ {booking.price}
                </td>
                <td className="flex flex-col sm:flex-row gap-2 sm:gap-3"> 
                  <button
                    onClick={() => handleDelete(booking._id)}
                    className="btn btn-error btn-xs sm:btn-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleReviewModal(booking)}
                    className="btn btn-success btn-xs sm:btn-sm"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedBooking && (
        <dialog ref={reviewModal} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box w-11/12 sm:w-[500px]"> 
            <h3 className="font-bold text-lg sm:text-xl text-gradient text-center mb-3">
              Review for {selectedBooking.serviceName}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Rating (1-5)
                </label>
                <input
                  type="number"
                  name="ratings"
                  min="1"
                  max="5"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Comment
                </label>
                <textarea
                  name="comment"
                  placeholder="Write your review here"
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 pt-2 sm:pt-3"> 
                <button
                  type="button"
                  className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-md hover:bg-indigo-50"
                  onClick={() => reviewModal.current.close()}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-md btn-outline bg-indigo-500 hover:bg-indigo-600"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyBookings;
