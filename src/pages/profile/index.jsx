import React, { useState } from "react";

const AdminProfilePage = () => {
  const [admin, setAdmin] = useState({
    name: "Jane Doe",
    email: "admin@example.com",
    role: "Super Admin",
    phone: "08012345678",
    profilePicture:
      "https://ui-avatars.com/api/?name=Jane+Doe&background=195C70&color=fff&size=256"
  });

  const [editMode, setEditMode] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState({ ...admin });
  const [previewImage, setPreviewImage] = useState(admin.profilePicture);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditedAdmin((prev) => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setAdmin({ ...editedAdmin });
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedAdmin({ ...admin });
    setPreviewImage(admin.profilePicture);
    setEditMode(false);
  };

  const handleChange = (field, value) => {
    setEditedAdmin((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-[#195C70] mb-6">Admin Profile</h1>

      <div className="bg-white shadow rounded-lg p-6 flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Picture */}
        <div className="flex-shrink-0 text-center">
          <img
            src={previewImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#195C70] mx-auto"
          />
          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 text-sm"
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-600">Full Name</label>
              {editMode ? (
                <input
                  type="text"
                  value={editedAdmin.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="mt-1 border w-full px-3 py-2 rounded-md"
                />
              ) : (
                <p className="font-medium text-lg">{admin.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              {editMode ? (
                <input
                  type="email"
                  value={editedAdmin.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1 border w-full px-3 py-2 rounded-md"
                />
              ) : (
                <p className="font-medium text-lg">{admin.email}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm text-gray-600">Role</label>
              {editMode ? (
                <select
                  value={editedAdmin.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="mt-1 border w-full px-3 py-2 rounded-md"
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Editor</option>
                </select>
              ) : (
                <p className="font-medium text-lg">{admin.role}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-600">Phone</label>
              {editMode ? (
                <input
                  type="tel"
                  value={editedAdmin.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1 border w-full px-3 py-2 rounded-md"
                />
              ) : (
                <p className="font-medium text-lg">{admin.phone}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-[#195C70] text-white px-6 py-2 rounded hover:bg-[#144b5d] transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#195C70] text-white px-6 py-2 rounded hover:bg-[#144b5d] transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
