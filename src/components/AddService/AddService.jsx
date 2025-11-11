import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const AddService = () => {
  const {loading} = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const image = e.target.image.value;
    const providerName = e.target.providerName.value;
    const providerEmail = e.target.providerEmail.value;

    const newService = {
      name,
      category,
      description,
      price,
      image,
      providerName,
      providerEmail,
      createdAt: new Date().toISOString(),
    };

    console.log("submitted", newService);

    fetch("http://localhost:5000/services", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newService),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your Service has been Added",
            showConfirmButton: false,
            timer: 1500,
          });
          e.target.reset();
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10 inter-font ">
      <h2 className="text-2xl font-bold mb-4 text-center text-gradient">
        Add New Service
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="providerName"
          placeholder="Provider Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="providerEmail"
          placeholder="Provider Email"
          className="input input-bordered w-full"
          required
        />

        <button
          type="submit"
          className="w-full btn-outline text-white py-2 rounded-md "
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
