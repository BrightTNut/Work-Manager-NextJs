"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { toast } from "react-toastify";
import { currentUser as fetchCurrentUser } from "@/services/userService";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const load = async () => {
      try {
        const currentUserData = await fetchCurrentUser(); // Rename to avoid conflict
        //  console.log(currentUserData);
        setUser({ ...currentUserData }); // Update user state with fetched current user data
      } catch (error) {
        //   console.log("Error during loading current user:", error);
        // toast.error("Error during loading current user");
        setUser(undefined);
      }
    };
    load();
  }, []); // Fetch current user only once when component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
