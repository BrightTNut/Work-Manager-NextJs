"use client";
import React, { useState } from "react";
import Image from "next/image";
import Signup from "./signup.svg";
import { toast } from "react-toastify";
import { signUp } from "@/services/userService";
const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://i.stack.imgur.com/34AD2.jpg",
  });
  const datasubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (data.name.trim() == "" || data.name == null) {
      toast.warning("Name is Required!!", {
        position: "top-center",
      });

      return;
    }

    //form submit
    try {
      const result = await signUp(data);
      toast.success("New user ADDED !!!");
      setData({
        name: "",
        email: "",
        password: "",
        about: "",
        profileURL: "https://i.stack.imgur.com/34AD2.jpg",
      });
      console.log(result);
    } catch (error) {
      console.log("Error during adding user in Signup.jsx Page", error);
      toast.error("Sign up Error !!!");
    }
  };

  return (
    <div className="grid grid-cols-12 h-11/12">
      <div className="col-start-2 col-end-5 flex justify-center shadow-lg shadow-red-100 w-full ">
        <Image src={Signup} alt="Sign up Banner" />
      </div>
      <div className="col-start-7 col-end-12 shadow-lg shadow-red-100 px-5">
        <div>
          <h1 className="text-center text-4xl">Sign up Page</h1>
          <form className="py-5" onSubmit={datasubmit}>
            {/* Name input  */}
            <label htmlFor="username" className="block ">
              UserName
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter User Name"
              className="text-blue-900 p-2 w-full mt-5 rounded-lg shadow-md  shadow-blue-400  bg-teal-100"
              onChange={(e) => {
                setData({
                  ...data,
                  name: e.target.value,
                });
              }}
              value={data.name}
            />
            {/* Email input  */}{" "}
            <label htmlFor="email_id" className="block mt-5">
              Email Id
            </label>
            <input
              id="email_id"
              type="email"
              placeholder="Enter User Email"
              className="p-2 w-full mt-4 rounded-lg shadow-md text-blue-900  shadow-blue-400  bg-teal-100"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              value={data.email}
            />
            {/*Password input  */}
            <label htmlFor="password" className="block mt-5">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="p-2 w-full mt-5 rounded-lg text-blue-900 shadow-md  shadow-blue-400  bg-teal-100"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              value={data.password}
            />
            {/* About section  */}{" "}
            <label htmlFor="user_about" className="block mt-5">
              User About
            </label>
            <textarea
              id="user_about"
              type="text"
              placeholder="Enter User About"
              className="p-2 text-blue-900 w-full mt-4 rounded-lg shadow-md  shadow-blue-400  bg-teal-100"
              rows={5}
              onChange={(e) => {
                setData({
                  ...data,
                  about: e.target.value,
                });
              }}
              value={data.about}
            />
            {/* Submit Button */}
            <div className="justify-center flex mt-4 gap-5">
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() =>
                  setData({
                    name: "",
                    email: "",
                    password: "",
                    about: "",
                    profileURL: "https://i.stack.imgur.com/34AD2.jpg",
                  })
                }
                className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* {JSON.stringify(data)} */}
    </div>
  );
};

export default SignUp;
