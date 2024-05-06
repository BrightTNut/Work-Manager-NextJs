import { httpaxios } from "@/helper/httpHelper";
import { toast } from "react-toastify";

//This Page connect jsx page to our api route pages

//sign up page handler
export async function signUp(user) {
  const result = await httpaxios
    .post("/api/user", user)
    .then((response) => response.data);

  return result;
}

//Login page handler
export async function login(loginData) {
  const result = httpaxios
    .post("/api/login", loginData)
    .then((response) => response.data);
  return result;
}

export async function currentUser() {
  const result = await httpaxios
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

export async function logout() {
  const result = await httpaxios
    .post("/api/logout")
    .then((response) => response.data);
  return result;
}
