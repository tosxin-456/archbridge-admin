import React, { useState } from "react";

const AdminSettingsPage = () => {
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    accessLevel: "Moderator",
    profilePicture: null
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleAddAdmin = (e) => {
    e.preventDefault();

    if (!newAdmin.profilePicture) {
      alert("Please upload a profile picture.");
      return;
    }

    // TODO: Submit to API
    alert(
      `Admin ${newAdmin.name} added with access level: ${newAdmin.accessLevel}`
    );
    setNewAdmin({
      name: "",
      email: "",
      password: "",
      accessLevel: "Moderator",
      profilePicture: null
    });

    // Optionally reset file input manually
    document.getElementById("profilePicInput").value = "";
  };

  const handleProfilePicChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      profilePicture: e.target.files[0]
    });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // TODO: Submit password update to API
    alert("Password changed successfully!");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-[#195C70] mb-6">Admin Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add New Admin */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Access Level</label>
              <select
                value={newAdmin.accessLevel}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, accessLevel: e.target.value })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
              >
                <option>Super Admin</option>
                <option>Moderator</option>
                <option>Viewer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                id="profilePicInput"
                onChange={handleProfilePicChange}
                className="mt-1 block w-full border px-3 py-2 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#195C70] file:text-white file:rounded-md file:cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="bg-[#195C70] text-white px-4 py-2 rounded hover:bg-[#144b5d] transition"
            >
              Add Admin
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <input
                type="password"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value
                  })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })
                }
                className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#195C70] text-white px-4 py-2 rounded hover:bg-[#144b5d] transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
