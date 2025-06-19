import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    gender: "",
    mobile: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Full Name"
            name="userName"
            value={formData.userName}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={formData.gender}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            required
          >
            <option value="">select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="tel"
            placeholder="Mobile Number"
            name="mobile"
            value={formData.mobile}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded hover:bg-teal-700"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an Account?{" "}
            <Link to="/login" className="text-teal-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;
