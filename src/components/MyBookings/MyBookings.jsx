import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBooking, setMyBooking] = useState([]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/my-booking/${_id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your booking has been deleted.",
                icon: "success",
              });
              const remaining = myBooking.filter(booking => booking._id !== _id)
              setMyBooking(remaining)
            }
          });
      }
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/my-booking?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyBooking(data);
      });
  }, [user.email]);
  return (
    <div>
      <div className="max-w-[1550px] mx-auto inter-font">
        <div>
          <h1 className="text-5xl font-bold text-center mt-10 mb-7">
            My <span className="text-gradient">Bookings</span>
          </h1>
        </div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table bg-white">
              {/* head */}
              <thead>
                <tr>
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
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                user.photoURL ||
                                "https://i.ibb.co/Kz0jptXW/profile.jpg"
                              }
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.displayName}</div>
                          <div className="text-sm opacity-50">Bangladesh</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="font-semibold">
                        {" "}
                        {booking.serviceName}
                      </span>
                    </td>
                    <td>
                      <div className=" bg-amber-200 text-gradient">
                        {booking.category}
                      </div>
                    </td>
                    <td>$ {booking.price}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="btn btn-dash btn-error btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
