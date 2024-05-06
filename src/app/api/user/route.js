import { NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export async function GET(request) {
  let users = [];
  try {
    await connectDb();

    users = await User.find();
  } catch (error) {
    console.log("error in fetching Users !!!!", error);
    return NextResponse.json({
      message: "failed to get users",
      success: false,
    });
  }
  //for export
  return NextResponse.json(users);
}
export async function POST(request) {
  //fetch user data
  const { name, email, password, about, profileURL } = await request.json();
  // const { name, email,password,about} = await request.json();

  //craete user with user modal
  const user = new User({
    name,
    email,
    password,
    about,
    profileURL,
  });
  try {
    await connectDb();

    //for in crypting the password in database
    user.password = bcrypt.hashSync(
      user.password,
      parseInt(process.env.BCRYPT_SALT)
    );
    //
    //saving data
    const createdUser = await user.save();

    const response = NextResponse.json(user, {
      status: 201,
    });
    return response;
  } catch (error) {
    console.log("Error during creating new User!!!!", error);

    return NextResponse.json({
      messsage: "Failed to create user !!",
      status: false,
    });
  }
}
