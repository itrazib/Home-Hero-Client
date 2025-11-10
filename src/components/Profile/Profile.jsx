import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold text-gray-600">
          Please log in first.
        </h2>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex flex-col items-center">
        <img
          src={photo || "https://via.placeholder.com/150"}
          alt="User Avatar"
          className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4"
        />

        {!editMode ? (
          <>
            <h2 className="text-2xl font-semibold">
              {user.displayName || "No Name"}
            </h2>
            <p className="text-gray-600">{user.email}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition-all"
              >
                Edit Profile
              </button>
              <button
                onClick={logOut}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition-all"
              >
                Log Out
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="w-full mt-4 space-y-4">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Photo URL</label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={updating}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition-all"
              >
                {updating ? "Updating..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-5 py-2 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        <ToastContainer position="top center"></ToastContainer>
      </div>
    </div>
  );
};

export default Profile;
