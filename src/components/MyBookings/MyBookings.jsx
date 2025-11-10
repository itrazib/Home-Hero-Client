import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";


const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [myBooking, setMyBooking] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/my-booking?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyBooking(data);
      });
  }, []);
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
                {myBooking.map((booking,index) => (
                  <tr>
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
                      <span className="font-semibold"> {booking.serviceName}</span>
                    </td>
                    <td>
                      <div className=" bg-amber-200 text-gradient">
                        {booking.category}
                      </div>
                    </td>
                    <td>$ {booking.price}</td>
                    <td>
                      <button className="btn btn-dash btn-error btn-xs">
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
