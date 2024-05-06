import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("Middleware exected");

  //for checking user Login or not
  //fetching cookie token
  const authTokenCheck = request.cookies.get("authToken")?.value;
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/users"
  ) {
    return;
  }
  const loggedInUser =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/signup";

  if (loggedInUser) {
    if (authTokenCheck) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    if (!authTokenCheck) {
      if (request.nextUrl.pathname.startsWith("/api")) {
        return (
          {
            message: "Access Denied!",
            success: false,
          },
          {
            status: 401,
          }
        );
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  console.log(authTokenCheck);

  // return NextResponse.redirect(new URL("/home", request.url));
}

//see "Matching Paths"
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-tasks",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
