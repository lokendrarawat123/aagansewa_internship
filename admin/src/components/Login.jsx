import { useState } from "react";
import Input from "./shared/Input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/authState";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useSignInMutation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({
      ...prev, //spread operator
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("please fill all the fields");
      return;
    }

    try {
      const res = await login(data).unwrap(); //calling login api throuh redux
      toast.success(res.message || "logged in");

      dispatch(setUser(res?.user));
      console.log(res);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.data?.message || "something went wrong ");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        {/* Login Heading */}
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            type="text"
            placeholder="Enter the email"
            id="email"
            required
            value={data.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter the password"
            id="password"
            required
            value={data.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
