import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ServiceCard from "../Home/Service/ServiceCard";

const Myservice = () => {
  const { user } = useContext(AuthContext);
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setService(data);
      });
  }, [user]);
  return (
    <div className="max-w-[1550px] mx-auto inter-font">
      <div>
        <h1 className="text-5xl font-bold text-center mt-10 mb-7">
          My <span className="text-gradient">Service</span>
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
              {service.map((s, index) => (
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
                    <span className="font-semibold"> {s.name}</span>

                    <br />
                    <span className="text-gray-500">{s.providerName}</span>
                  </td>
                  <td>
                    <div className="badge badge-soft badge-success">
                      {s.category}
                    </div>
                  </td>
                  <td>$ {s.price}</td>
                  <td>
                    <button className="btn btn-dash btn-error btn-xs mr-3">
                      Delete
                    </button>
                    <button className="btn btn-dash btn-success btn-xs">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myservice;
