import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import signUpApi from "../api/signUpApi";
const signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);
  function changeHandler(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await signUpApi(formData);
    if (response) {
      navigate("/login");
    }
  };
  return (
    <div className="from-gray-50 to-blue-500 bg-gradient-to-r h-screen flex justify-center items-center   ">
      <div>
        <img
          className="w-96 rounded-full shadow-2xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XFscFmsekCqCW66VDEvMUIfJBubsDxNSeA&s"
        />
      </div>
      <div className="w-[550px] p-3">
        <h1 className="my-7 text-center  text-6xl font-bold italic underline ">
          Sign-Up
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3 ">
          <input
            className="border p-3 rounded-full focus:outline-none shadow-lg"
            type="text"
            placeholder="username"
            name="username"
            value={formData.username}
            onChange={changeHandler}
          />
          <input
            className="border p-3 rounded-full focus:outline-none shadow-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <label className="relative">
            <input
              className="border p-3 rounded-full focus:outline-none shadow-lg w-full"
              type={showPass ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
            />
            <span
              className="absolute right-5 top-4 cursor-pointer "
              onClick={() => setShowPass((prev) => !prev)}
            >
              {showPass ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>
          </label>
          <p className="text-white text-center">
            <span className="text-red-700">*</span>min 8 cha. & contain special
            Character
          </p>
          <button
            className="border  p-3 rounded-full  text-white hover:opacity-95
        disabled:opacity-80"
          >
            Register
          </button>
        </form>
        <div className="mt-5 flex gap-2">
          <p>Have an account?</p>
          <Link to="/login">
            <span className="text-blue-700">Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signup;
