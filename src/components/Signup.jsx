import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import leftArrow from "../assets/images/left_arrow.svg";
import postData from "../utils/postData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import homeIcon from "../assets/images/home_icon.svg";

export default function Signup(props) {
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    setLoading(true);
    const data = {
      name: name,
      email: email,
    };

    const res = await postData("/api/auth/signup", data);
    if (res.success === true) {
      toast(res.message, {
        theme: props.mode,
        type: "success",
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate(`/user/verify/${res.user._id}`);
      }, 2000);
    } else {
      toast(res.message, {
        type: "error",
        theme: props.mode,
        autoClose: 2000,
      });
    }
    setLoading(false);
  };

  const handleForm = (event) => {
    event.preventDefault();
    signUp();
  };

  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="mt-4 mx-2 flex justify-between items-center">
            <img
              src={leftArrow}
              alt="left-arrow"
              className={`w-7 h-7 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={() => navigate(-1)}
            />
            <img
              src={homeIcon}
              alt="home-icon"
              className={`w-9 cursor-pointer ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
              onClick={() => navigate("/")}
            />
          </div>
          <form
            className="mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-72 2xl:mx-96 my-10"
            onSubmit={handleForm}
          >
            <div
              className={`font-extrabold text-2xl mb-7 text-center ${
                props.mode === "light" ? "text-black" : "text-white"
              }`}
            >
              Sign Up
            </div>
            <div className="my-6">
              <input
                type="text"
                placeholder="Your Full Name"
                className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
                  props.mode === "light"
                    ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                    : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
                }`}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className="my-6">
              <input
                type="email"
                placeholder="Your Email Address"
                className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
                  props.mode === "light"
                    ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                    : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
                }`}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="my-6">
              <button
                type="submit"
                className={`w-full py-3 rounded-3xl font-semibold text-lg bg-blue-500 text-white shadow-lg`}
              >
                Sign up
              </button>
            </div>
          </form>
          <div className={`text-center mt-24 font-medium text-gray-400`}>
            Already have an account?
            <Link to="/login">
              <span className="text-blue-500"> Log in</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
