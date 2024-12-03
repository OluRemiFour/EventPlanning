"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Header from "../components/Header";

function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = () => {
    if (
      name.trim().length < 1 ||
      password.trim().length < 1 ||
      !email.includes("@")
    ) {
      // setError("Please fill out all fields correctly.");
      setDisabled(true);
      return;
    }
    // setError("");
    setDisabled(false);
  };

  useEffect(() => {
    handleUserInput();
  }, [name, password, email]);

  const handleNavigate = () => {
    window.location.href = "/login";
  };

  const handleUserSignup = async (event) => {
    event.preventDefault();
    const baseUrl = "/api/signup";
    setIsLoading(true);

    try {
      const request = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, email }),
      });

      if (request.ok) {
        const response = await request.json();
        toast.success("User successfully registered, Procced to login");
        handleNavigate();
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="md:flex items-center lg:gap-32 md:gap-14">
        <Image
          aria-hidden
          src="/authpic.svg"
          alt="Logo"
          width={800}
          height={800}
          className="h-full"
        />
        <div className="px-[40px] py-10">
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-semibold text-[24px] py-2">
              Create Your Account
            </h1>
            <p className="py-2 text-[#999999]">
              Join us to plan, manage, and celebrate amazing events with ease.
            </p>
          </div>

          <form className="my-8 space-y-4">
            <div className="flex flex-col space-y-2 my-4">
              <label htmlFor="email">Full Name</label>
              <input
                type="text"
                id="text"
                required
                placeholder="John Doe"
                className="border outline-none p-3 rounded-md"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 my-4">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                required
                className="outline-none border p-3 rounded-md"
                placeholder="Johndoe@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2 my-4">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                id="password"
                required
                className="outline-none border p-3 rounded-md"
                placeholder="****************"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-right text-[#999999] underline cursor-pointer text-sm">
              <p>Forgot Password</p>
            </div>

            <button
              type="submit"
              disabled={disabled}
              aria-disabled={disabled}
              onClick={handleUserSignup}
              className={`${
                disabled
                  ? "bg-[#0062CC4D] cursor-not-allowed"
                  : "bg-[var(--primary-color)] cursor-pointer"
              } text-white my-2 w-full rounded-[8px] py-4 px-4 transition duration-200`}
            >
              {isLoading ? (
                <Image
                  src="/Spinner.svg"
                  height={10}
                  width={10}
                  alt="Loading"
                  className="text-center w-[8%] mx-auto"
                />
              ) : (
                "Sign in"
              )}
            </button>

            <div className="text-center text-[#999999] my-6">
              Already have an account? {""}
              <a href="login" className="text-[var(--primary-color)] underline">
                Log In
              </a>
            </div>
          </form>

          <div className="items-center flex justify-between px-12">
            <div className="w-[10rem] h-[1px] bg-gray-300"></div>
            <p>Or</p>
            <div className="w-[10rem] h-[1px] bg-gray-300"></div>
          </div>

          <Link
            href={"/"}
            className="mt-14 flex items-center justify-center px-3 py-2 gap-2 border border-[var(--primary-color)] rounded-lg w-full"
          >
            <FcGoogle size={24} />
            <p className="text-center text-[var(--primary-color)] py-2">
              Continue with Google
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
