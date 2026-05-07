import { useState, useEffect } from "react";
import Input from "../shared/Input";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useSignInMutation } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/features/authState";

const Login = () => {
  // 1. User ko data pani line state bata
  const { isAuth, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useSignInMutation();

  // 2. Dashboard protection logic yaha sudharnu parcha
  useEffect(() => {
    if (isAuth && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "manager") {
        navigate("/addmin/manager-dashboard");
      }
    }
  }, [isAuth, user, navigate]); // user ra isAuth dubai dependancy ma rakhne

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
      toast.error("please fill all the fields");
      return;
    }

    try {
      const res = await login(data).unwrap();
      toast.success(res.message || "logged in");

      dispatch(setUser(res?.user));

      // 3. Login successful bhae bittikai pani role herne
      const role = res?.user?.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "manager") {
        navigate("/addmin/manager/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.data?.message || "something went wrong");
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
