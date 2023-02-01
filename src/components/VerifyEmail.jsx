import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import putData from "../utils/putData";

export default function VerifyEmail(props) {
  const [OTP, setOTP] = useState("");
  const {userId} = useParams();
  const navigate = useNavigate();

  const verify = async() => {
    const res = await putData(`/api/auth/user/verify/${userId}`, {otp: OTP});
    if (res.success === true){
        toast("Email Verification Successful", {
            type: "success",
            mode: props.mode,
            autoClose: 2000
        });

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }
    else {
        toast(res.message, {
            type: "error",
            mode: props.mode,
            autoClose: 2000
        });
    }
  }

  const handleForm = (event) => {
    event.preventDefault();
    verify();
  };
  return (
    <div className="mt-40">
      <ToastContainer />
      <form
        className="mx-4 sm:mx-10 md:mx-20 lg:mx-36 xl:mx-72 2xl:mx-96 my-10"
        onSubmit={handleForm}
      >
        <div
          className={`font-extrabold text-2xl mb-7 text-center ${
            props.mode === "light" ? "text-black" : "text-white"
          }`}
        >
          Verify Email
        </div>
        <div className="my-6">
          <input
            type="number"
            placeholder="Enter OTP"
            className={`w-full border-2 py-3 px-6 font-lg outline-none rounded-3xl shadow-md ${
              props.mode === "light"
                ? "border-gray-200 bg-white text-gray-500 placeholder:text-gray-500"
                : "border-gray-400 bg-gray-600 text-gray-100 placeholder:text-gray-100"
            }`}
            value={OTP}
            onChange={(event) => {
              setOTP(event.target.value);
            }}
          />
        </div>
        <div className="my-6">
          <button
            type="submit"
            className={`w-full py-3 rounded-3xl font-semibold text-lg bg-blue-500 text-white shadow-lg`}
          >
            Verify
          </button>
        </div>
      </form>
      <div className={`text-center font-semibold font-sans text-lg ${props.mode === "light" ? "text-black" : "text-white"}`}>
        Open your mail you have received an OTP <a href="https://mail.google.com/mail" target="_blank" rel="noreferrer" className={`text-blue-600`}>click here</a>.
      </div>
    </div>
  );
}
