import { useState } from "react";
import Input from "../shared/Input";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/authState";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useSignInMutation();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await login(data).unwrap();

      toast.success(res.message || "Login successful");

      // set redux user
      dispatch(setUser(res?.user));

      const role = res?.user?.role;

      // role-based redirect
      if (role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "manager") {
        navigate("/admin/manager-dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="flex flex-col items-center bg-white p-10 rounded-xl shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">LOGIN</h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <Input
            label="Email"
            type="text"
            placeholder="Enter email"
            id="email"
            value={data.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded-lg mt-3"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
