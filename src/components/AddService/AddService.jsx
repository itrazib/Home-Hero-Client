import React from "react";
import Swal from "sweetalert2";

const AddService = () => {
  // name
  // "Laptop Repair"
  // category
  // "Electronics"
  // price
  // 80
  // description
  // "Expert laptop repair and maintenance service."
  // image
  // "https://i.ibb.co/xyz456/laptop.jpg"
  // providerName
  // "TechFix Solutions"
  // providerEmail
  // "provider4@example.com"
  // createdAt
  // 2025-11-09T06:15:00.000+00:00

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
