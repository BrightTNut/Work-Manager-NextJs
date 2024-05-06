import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { toast } from "react-toastify";
import { connectDb } from "@/helper/db";
export async function POST(request) {
  //for feching data request.json())
  const { name, email, password } = await request.json();

  try {
    await connectDb();

    //1. get user
    const user = await User.findOne({
      name: name,
      email: email,
    });
    if (user == null) {
      toast.error("Error to find user");
      throw new Error("User Not Found!!!");
    }

    //2.Password checking
    const matched = bcrypt.compareSync(password, user.password);
    if (!matched) {
      throw new Error("Password Incorrect!!!");
    }

    //3. Genrating JWT Token
    const JwtToken = JWT.sign(
      {
        _id: user.id,
        name: user.name,
      },
      process.env.JWT_KEY
    );
    // console.log(user);
    // console.log("JWT Token == ", JwtToken);

    //4. create Next.Response --cookie
    const respones = NextResponse.json({
      message: "Login Success !!",
      success: true,
      user: user,
    });

    respones.cookies.set("authToken", JwtToken, {
      expiresIn: "1d",
      httpOnly: true,
    });
    return respones;
  } catch (error) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
