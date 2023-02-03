import React, { useEffect, useState } from "react";
import profileImg from "../assets/images/profile-image.svg";
import passwordIcon from "../assets/images/password_icon.svg";
import userIcon from "../assets/images/user_icon.svg";
import logoutIcon from "../assets/images/logout_icon.svg";
import leftArrow from "../assets/images/left_arrow.svg";
import rightArrow from "../assets/images/right_arrow.svg";
import colorMode from "../assets/images/color_mode.png";
import loginIcon from "../assets/images/login_icon.svg";
import { Link } from "react-router-dom";
import getData from "../utils/getData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserProfile(props) {
  const [userData, setUserData] = useState(null);
  
  const getProfile = async () => {
    const res = await getData("/api/auth/profile");
    if (res.success === true) {
      setUserData(res.user);
    } else {
      setUserData(null);
    }
  };

  const logout = async () => {
    const res = await getData("/api/auth/logout");
    if (res.success === true) {
      toast("Logout Successfull", {
        type: "success",
        theme: props.mode,
        autoClose: 2000,
      });
    } else {
      toast(res.message, {
        type: "error",
        theme: props.mode,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, [userData]);

  return (
    <div className={props.mode === "light" ? "bg-white" : "bg-gray-800"}>
      <ToastContainer />
      <div className="flex justify-between items-center py-3 px-5">
        <Link to={"/"}>
          <img
            src={leftArrow}
            alt="left-arrow"
            className={`w-7 h-7 ${
              props.mode === "light" ? "invert-0" : "invert"
            }`}
          />
        </Link>
        <img
          src={colorMode}
          alt="color-mode"
          className={`w-7 h-7 cursor-pointer ${
            props.mode === "light" ? "invert-0" : "invert"
          }`}
          onClick={props.toggleMode}
        />
      </div>
      <div className="flex flex-col items-center justify-center mx-8 mt-2">
        <div>
          <img src={profileImg} alt="profile-pic" className="w-32 h-32" />
        </div>
        <div
          className={`text-2xl font-bold mt-4 ${
            props.mode === "light" ? "text-black" : "text-white"
          }`}
        >
          {userData ? userData.name : "Unknown user"}
        </div>
        <div
          className={`text-lg ${
            props.mode === "light" ? "text-gray-500" : "text-gray-400"
          }`}
        >
          {userData ? userData.email : ""}
        </div>
      </div>
      <div className="mt-10 mx-8 sm:mx-16 md:mx-24 lg:mx-36 xl:mx-56 2xl:mx-96">
        <Link to={`/username/update/${userData && userData._id}`} className={userData ? "block" : "hidden"}>
          <div
            className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
              props.mode === "light"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-300 bg-gray-700"
            }`}
          >
            <div className="flex items-center">
              <img
                src={userIcon}
                alt="user-icon"
                className={`w-8 h-8 ${
                  props.mode === "light" ? "invert-0" : "invert"
                }`}
              />
              <div className="ml-2">Update Name</div>
            </div>
            <img
              src={rightArrow}
              alt="right-arrow"
              className={`w-6 h-6 ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
            />
          </div>
        </Link>
        <Link to={`/password/update/${userData && userData._id}`} className={userData ? "block" : "hidden"}>
          <div
            className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
              props.mode === "light"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-300 bg-gray-700"
            }`}
          >
            <div className="flex items-center">
              <img
                src={passwordIcon}
                alt="user-icon"
                className={`w-8 h-8 ${
                  props.mode === "light" ? "invert-0" : "invert"
                }`}
              />
              <div className="ml-2">Update Password</div>
            </div>
            <img
              src={rightArrow}
              alt="right-arrow"
              className={`w-6 h-6 ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
            />
          </div>
        </Link>
        <div
          className={`${userData ? "block" : "hidden"} cursor-pointer`}
          onClick={logout}
        >
          <div
            className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
              props.mode === "light"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-300 bg-gray-700"
            }`}
          >
            <div className="flex items-center">
              <img
                src={logoutIcon}
                alt="user-icon"
                className={`w-8 h-8 ${
                  props.mode === "light" ? "invert-0" : "invert"
                }`}
              />
              <div className="ml-2">Logout</div>
            </div>
            <img
              src={rightArrow}
              alt="right-arrow"
              className={`w-6 h-6 ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
            />
          </div>
        </div>
        <Link to="/login" className={userData ? "hidden" : "block"}>
          <div
            className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
              props.mode === "light"
                ? "text-gray-700 bg-gray-100"
                : "text-gray-300 bg-gray-700"
            } ${userData ? "hidden" : "block"}`}
          >
            <div className="flex items-center">
              <img
                src={loginIcon}
                alt="user-icon"
                className={`w-8 h-8 ${
                  props.mode === "light" ? "invert-0" : "invert"
                }`}
              />
              <div className="ml-2">Login/Signup</div>
            </div>
            <img
              src={rightArrow}
              alt="right-arrow"
              className={`w-6 h-6 ${
                props.mode === "light" ? "invert-0" : "invert"
              }`}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
