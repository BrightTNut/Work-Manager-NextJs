import { getResponesMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

export async function GET(request, { params }) {
  const { taskId } = params;
  try {
    await connectDb();

    const task = await Task.findById(taskId);
    //  console.log(task);
    return NextResponse.json(task);
  } catch (error) {
    console.log("Error during fetching single user tasks!!!", error);
    return getResponesMessage(
      "Error during fetching single user tasks!!!",
      500,
      false
    );
  }
}
export async function POST() {}
export async function PUT(request, { params }) {
  try {
    await connectDb();

    const { taskId } = params;
    const { title, content, status } = await request.json();
    let task = await Task.findById(taskId);
    task.title = title;
    task.content = content;
    task.status = status;

    const updatedtask = await task.save();
    return NextResponse(updatedtask);
  } catch (error) {
    console.log("Error during to Put request !!".error);
    return getResponesMessage("Error during to Put request !!", 500, false);
  }
}
export async function DELETE(request, { params }) {
  try {
    await connectDb();

    const { taskId } = params;
    await Task.deleteOne({ _id: taskId });

    return getResponesMessage(
      "No Error during to Delete request !!",
      501,
      true
    );
  } catch (error) {
    console.log("Error during to Delete request !!".error);
    return getResponesMessage("Error during to Delete request !!", 500, false);
  }
}
