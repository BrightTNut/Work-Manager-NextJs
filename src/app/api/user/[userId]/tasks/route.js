import { getResponesMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

export async function GET(request, { params }) {
  const { userId } = params;
  try {
    await connectDb();

    const tasks = await Task.find({
      userId: userId,
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log("Error in userid/task route Get !!", error);
    return getResponesMessage("Error in userid/task route Get !!", 500, false);
  }
}
