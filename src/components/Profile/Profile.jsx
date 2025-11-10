import React, { useContext, useState } from "react";
import { updateEmail, updateProfile } from "firebase/auth";
import { AuthContext } from "../../Context/AuthContext";
import { auth } from "../../firebase/firebase.init";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
   const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      
      if (email && email !== user.email) {
        await updateEmail(auth.currentUser, email);
        toast.success("✅ Email updated successfully!");
      }

      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      if (error.code === "auth/requires-recent-login") {
        toast.error("⚠️ Please log in again to change email.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("❌ Invalid email address.");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("⚠️ This email is already in use.");
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setSaving(false);
    }
  };


  return (
   <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border">
      <h2 className="text-2xl font-semibold text-center mb-6">
        User Profile
      </h2>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={photo || "https://i.ibb.co/2M7rtL3/user.png"}
          alt="User"
          className="w-24 h-24 rounded-full border mb-3"
        />
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-gray-600">{email}</p>
        <p className="text-sm text-gray-500 mt-2">
          Last Login: {user?.metadata?.lastSignInTime || "N/A"}
        </p>
      </div>

      {editMode ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block mb-1 text-sm font-medium">Photo URL</label>
            <input
              type="text"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary"
            >
              {saving ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <button
            onClick={() => setEditMode(true)}
            className="btn btn-outline btn-primary"
          >
            Edit Profile
          </button>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Profile;
