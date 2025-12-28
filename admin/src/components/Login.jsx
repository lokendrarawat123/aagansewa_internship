import { useState } from "react";
import Input from "./shared/input";

const Login = () => {
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
  const name = data.email.split("@")[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`hello ${name}`);
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
