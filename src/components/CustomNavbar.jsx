"use client";
import React, { useContext } from "react";
import Link from "next/link";
import UserContext from "@/context/userContext";
import { logout } from "@/services/userService";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const CustomNavbar = () => {
  const usercontext = useContext(UserContext);
  const route = useRouter();
  //  console.log(usercontext);

  async function doLogout() {
    try {
      const result = await logout();
      // console.log(result);
      usercontext.setUser(undefined);
      toast.success("Log Out SucessFully !!!!");
      route.push("/login");
    } catch (error) {
      console.log("Error in Log Out !!!!", error);
      toast.error("Error in Log Out !!!!");
    }
  }

  return (
    <nav className="bg-sky-600 h-10/12 px-3 py-6 flex justify-between">
      <div className="brand">
        <a href="#" className="text-2xl">
          Work Manager
        </a>
      </div>
      <div>
        <ul className="flex gap-5">
          {usercontext.user && (
            <>
              <li>
                <Link href="/" className="hover:text-blue-800">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"/show-tasks"} className="hover:text-blue-800">
                  Show Tasks
                </Link>
              </li>
              <li>
                <Link href={"/add-tasks"} className="hover:text-blue-800">
                  Add Tasks
                </Link>
              </li>
            </>
          )}
          {/* <li>
            <Link href="/" className="hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <Link href={"/show-tasks"} className="hover:text-blue-800">
              Show Tasks
            </Link>
          </li>
          <li>
            <Link href={"/add-tasks"} className="hover:text-blue-800">
              Add Tasks
            </Link>
          </li> */}
        </ul>
      </div>
      <div>
        <ul className="flex space-x-2">
          {usercontext.user && (
            <>
              <li>
                <a href="/profile/user" className="hover:text-blue-800">
                  {usercontext.user.name}
                </a>
              </li>
              <li>
                <button onClick={doLogout} className="hover:text-blue-800">
                  Log Out
                </button>
              </li>
            </>
          )}
          {!usercontext.user && (
            <>
              <li>
                <a href="/login" className="hover:text-blue-800">
                  Login
                </a>
              </li>
              <li>
                <Link href="/signup" className="hover:text-blue-800">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default CustomNavbar;
