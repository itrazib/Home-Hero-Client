import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import ServiceCard from "../Home/Service/ServiceCard";
import Swal from "sweetalert2";

const Myservice = () => {
  const { user } = useContext(AuthContext);
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:5000/services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setService(data);
      });
  }, [user]);


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
          fetch(`http://localhost:5000/services/${_id}`, {
            method: "delete",
          })
            .then((res) => res.json())
            .then((data) => {
              
              if (data.deletedCount) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your service has been deleted.",
                  icon: "success",
                });
                const remaining = service.filter(service => service._id !== _id)
                setService(remaining)
              }
            });
        }
      });
    };

  if(loading){
    return (
      <div className="fixed inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                <p className="mt-3 text-gradient text-lg font-semibold">
                  Loading...
                </p>
              </div>
    )
  }
  return (
    <div className="max-w-[1550px] mx-auto inter-font">
      <title>My Service</title>
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
                    <div className=" text-pink-500 badge-success">
                      {s.category}
                    </div>
                  </td>
                  <td>$ {s.price}</td>
                  <td>
                    <button onClick={() =>handleDelete(s._id)} className="btn btn-dash btn-error btn-xs mr-3">
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
