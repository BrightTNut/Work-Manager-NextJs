import React from "react";
import ShowTasks from "./ShowTasks";
import { connectDb } from "@/helper/db";
connectDb();
export const metadata = {
  title: "All Tasks : Work Manager",
};
const ShowTasksPage = () => {
  return <ShowTasks />;
};

export default ShowTasksPage;
