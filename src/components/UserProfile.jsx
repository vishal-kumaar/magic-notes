import React, { useContext, useEffect, useState } from "react";
import profileImg from "../assets/images/profile-image.svg";
import passwordIcon from "../assets/images/password_icon.svg";
import userIcon from "../assets/images/user_icon.svg";
import logoutIcon from "../assets/images/logout_icon.svg";
import leftArrow from "../assets/images/left_arrow.svg";
import rightArrow from "../assets/images/right_arrow.svg";
import loginIcon from "../assets/images/login_icon.svg";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
import homeIcon from "../assets/images/home_icon.svg";
import ConfirmAlert from "./ConfirmAlert";
import getUserProfile from "../apis/getUserProfile";
import TokenContext from "../token/TokenContext";
import { toast } from "react-toastify";

export default function UserProfile(props) {
  const { token, removeUserToken } = useContext(TokenContext);
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    const res = await getUserProfile(token);
    if (res?.success) {
      setUserData(res.user);
    } else {
      setUserData(null);
    }
    setLoading(false);
  };

  const logout = async () => {
    removeUserToken();
    toast("Logout successful", {
      position: "top-right",
      theme: props.theme,
      type: "success",
      autoClose: 3000
    })
  };

  useEffect(
    () => {
      getProfile();
    },
    // eslint-disable-next-line
    [userData]
  );

  return (
    <>
      <ConfirmAlert
        confirmAlert={confirmAlert}
        setConfirmAlert={setConfirmAlert}
        title="Confirm logout"
        subtitle="Are you sure you want to log out?"
        mode={props.mode}
        button1={{
          name: "Logout",
          callback: logout,
        }}
        button2={{
          name: "Cancel",
        }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className={`flex-grow ${props.mode === "light" ? "bg-white" : "bg-gray-800"}`}>
            <div className="flex justify-between items-center py-3 px-5">
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
            <div className="flex flex-col items-center justify-center mx-8 mt-2">
              <div>
                <img src={profileImg} alt="profile-pic" className="w-32 h-32" />
              </div>
              <div
                className={`text-2xl font-signika mt-4 ${
                  props.mode === "light" ? "text-black" : "text-white"
                }`}>
                {userData ? userData.name : "Unknown user"}
              </div>
              <div
                className={`text-lg font-firasans ${
                  props.mode === "light" ? "text-gray-500" : "text-gray-400"
                }`}>
                {userData ? userData.email : ""}
              </div>
            </div>
            <div className="mt-10 mx-8 font-poppins sm:mx-16 md:mx-24 lg:mx-36 xl:mx-56 2xl:mx-96">
              <Link
                to={`/update/name/${userData && userData._id}`}
                className={userData ? "block" : "hidden"}>
                <div
                  className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
                    props.mode === "light"
                      ? "text-gray-700 bg-gray-100"
                      : "text-gray-300 bg-gray-700"
                  }`}>
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
              <Link
                to={`/update/password/${userData && userData._id}`}
                className={userData ? "block" : "hidden"}>
                <div
                  className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
                    props.mode === "light"
                      ? "text-gray-700 bg-gray-100"
                      : "text-gray-300 bg-gray-700"
                  }`}>
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
                onClick={() => setConfirmAlert(true)}>
                <div
                  className={`flex items-center justify-between shadow-md rounded-2xl px-2 py-1 my-4 ${
                    props.mode === "light"
                      ? "text-gray-700 bg-gray-100"
                      : "text-gray-300 bg-gray-700"
                  }`}>
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
                  } ${userData ? "hidden" : "block"}`}>
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
          <Footer mode={props.mode} />
        </div>
      )}
    </>
  );
}
