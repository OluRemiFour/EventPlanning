"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Header from "../components/Header";
import LoadingScreen from "../dashboard/components/Loader";
// import { cookies } from "next/headers";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadingScreen, setIsLoadingSereen] = useState(false);

  const handleUserInput = () => {
    if (password.trim().length < 1 || !email.includes("@")) {
      // setError("Please fill out all fields correctly.");
      setDisabled(true);
      return;
    }
    // setError("");
    setDisabled(false);
  };

  useEffect(() => {
    handleUserInput();
  }, [password, email]);

  const handleNavigate = () => {
    window.location.href = "/dashboard";
  };

  const handleUserSignIn = async (event) => {
    event.preventDefault();
    const baseUrl = "/api/login";
    setIsLoading(true);
    // setIsLoadingSereen(true);

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Login successful! Redirecting...");

        // document.cookie = `authToken=${data.access_token}; path=/; secure; HttpOnly`;
        // sessionStorage.setItem("authToken", data.access_token);

        typeof window !== undefined &&
          localStorage.setItem("authToken", data.access_token);
        handleNavigate();
      } else {
        const errorData = await response.json();
        let errorMessage = "Login failed, please try again.";

        if (errorData.message?.toLowerCase().includes("email")) {
          errorMessage = "The email provided is not registered or invalid.";
        } else if (errorData.message?.toLowerCase().includes("password")) {
          errorMessage = "Incorrect password. Please try again.";
        } else if (errorData.message) {
          errorMessage = errorData.message;
        }

        toast.error(errorMessage);
      }
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      if (error.message?.toLowerCase().includes("network")) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.name === "TypeError") {
        errorMessage = "Unable to reach the server. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      // setIsLoadingSereen(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="md:flex items-center md:gap-16 lg:gap-20 overflow-hidden">
        <Image
          aria-hidden
          src="/authpic.svg"
          alt="Logo"
          width={800}
          height={800}
          className="h-full"
        />
        <div className="px-[40px] py-8">
          <div className="flex justify-center flex-col items-center">
            <h1 className="font-semibold text-[24px] py-2">Welcome Back!</h1>
            <p className="py-2 text-[#999999]">
              Log in to access your events and start planning.{" "}
            </p>
          </div>

          <form className="my-8 space-y-4">
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
              onClick={handleUserSignIn}
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
                "Log in"
              )}
            </button>

            <div className="text-center text-[#999999] my-6">
              New here? {""}
              <a
                href="sign-up"
                className="text-[var(--primary-color)] underline"
              >
                Create an Account
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

      {/* {isLoadingScreen && <LoadingScreen />} */}
    </div>
  );
}

export default Login;
