import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace with real login/auth logic (e.g., API + token)
    if (form.email && form.password) {
      // Simulate successful login
      localStorage.setItem("admin", JSON.stringify(form)); // optionally store user
      navigate("/admin/dashboard");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#195C70] mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#195C70]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#195C70] text-white py-2 rounded hover:bg-[#144b5d] transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Forgot password?{" "}
          <a href="#" className="text-[#195C70] font-medium hover:underline">
            Reset here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
