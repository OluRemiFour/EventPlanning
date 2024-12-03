// app/not-found.js
import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/sign-up");
  return null;
}
