import { getResponesMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import jwt from "jsonwebtoken";
// Import necessary modules
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

export async function GET(resquest) {
  try {
    await connectDb();

    const tasks = await Task.find();
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error during fetching alll tasks!!!", error);
    return getResponesMessage("Error in getting data !!", 404, false);
  }
}

// Define your API route handler
export async function POST(request) {
  try {
    await connectDb();

    // Parse JSON data from the request body
    const { title, content, userId, status } = await request.json();

    const authToken = request.cookies.get("authToken")?.value;

    const data = jwt.verify(authToken, process.env.JWT_KEY);
    // console.log(data);
    //console.log(data._id);
    // Create a new Task object
    const task = new Task({
      title,
      content,
      userId: data._id,
      status,
    });

    // Save the task to the database
    const createdTask = await task.save();

    // Return a success response with the created task
    return NextResponse.json(createdTask, {
      status: 201,
    });
  } catch (error) {
    // Handle any errors that occur during task creation
    console.error("Error during creating tasks:", error);
    return getResponesMessage("Error during creating tasks", 500, false);
  }
}
