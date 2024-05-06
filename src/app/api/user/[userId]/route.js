import User from "@/models/user";
import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";

//for gettinh single user
export async function GET(response, { params }) {
  await connectDb();

  const userId = params.userId;

  const user = await User.findById(userId).select("-password");
  return NextResponse.json(user);
}

//delete user
export async function DELETE(response, { params }) {
  const userId = params.userId;

  try {
    await connectDb();

    await Student.deleteOne({
      _id: userId,
    });
    return NextResponse.json({
      message: "user delete!!",
      success: true,
    });
  } catch (error) {
    console.log("error in deleting !!!!", error);

    return NextResponse.json({
      message: "Delete error!!",
      success: false,
    });
  }
}

//updating user
export async function PUT(request, { params }) {
  const userId = params.userId;
  const { name, about, password } = await request.json();
  try {
    const user = await User.findById({ _id: userId });
    user.name = name;
    user.about = about;
    user.password = password;
    const updatedUser = await user.save();
    return NextResponse.json({
      message: "User  data updated!!!",
      success: true,
      updatedUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: "User not data updated!!!",
      success: false,
    });
  }
}
