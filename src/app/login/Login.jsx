"use client";
import React, { useContext, useState } from "react";
import LoginSvg from "./login.svg";
import Image from "next/image";
import { toast } from "react-toastify";
import { login } from "@/services/userService";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";

const Login = () => {
  const usercontext = useContext(UserContext);
  const router = useRouter();

  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    //   console.log(loginData);

    if (
      loginData.name.trim() === "" ||
      loginData.password.trim() === "" ||
      loginData.email.trim() === ""
    ) {
      toast.info("Please Enter All Fiealdes");
      return;
    }

    try {
      const result = await login(loginData);
      //   console.log(result);
      if (result.success == false) {
        toast.error("Please Enter Correct Info !!!");

        throw new Error("Please Enter Correct Info !!!");
      }

      //redirect
      usercontext.setUser(result.user);
      router.push("/profile/user");
      toast.success("Logged In Succesfully!!! !!!");
    } catch (error) {
      console.log(
        "Error in Connecting to userService !!! Error is ====  ",
        error
      );
    }
  };

  //Valid Data,Login
  //connecting with /services/userService.js

  return (
    <div className="grid grid-cols-12 h-11/12 mb-11">
      <div className="col-start-2 col-end-5 flex justify-center shadow-lg shadow-red-100 w-full h-full">
        <Image src={LoginSvg} alt="Login Banner" />
      </div>
      <div className="col-start-7 col-end-12 shadow-lg shadow-red-100 px-5">
        <h1 className="text-center text-4xl">Login Page</h1>
        <form className="py-5" onSubmit={submitLogin}>
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
              setLoginData({
                ...loginData,
                name: e.target.value,
              });
            }}
            value={loginData.name}
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
              setLoginData({
                ...loginData,
                email: e.target.value,
              });
            }}
            value={loginData.email}
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
              setLoginData({
                ...loginData,
                password: e.target.value,
              });
            }}
            value={loginData.password}
          />
          <div className="justify-center flex mt-4 gap-5">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginData({
                  name: "",
                  email: "",
                  password: "",
                });
              }}
              className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
