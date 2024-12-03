"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { useAtom, useSetAtom } from "jotai";
import { activeUser } from "../lib/User";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const setActiveUser = useSetAtom(activeUser);
  const [loggedInUser] = useAtom(activeUser);

  console.log(loggedInUser);
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

  console.log(email, password);

  // const handleUserSignIn = async (event) => {
  //   event.preventDefault();
  //   const baseUrl = "/api/auth/login";
  //   setIsLoading(true);
  //   try {
  //     const request = await fetch(baseUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     if (request.status === 200) {
  //       const response = await request.json();
  //       console.log(response);
  //       toast.success("Login successful");
  //       handleNavigate();
  //       setIsLoading(false);
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     toast.error("Error logging in");
  //     toast.error(e);
  //     console.error("Error logging in:", error);
  //   }
  // };

  // const handleUserSignIn = async (event) => {
  //   event.preventDefault();
  //   const baseUrl = "/api/login";
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch(baseUrl, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       toast.success("Login successful! Redirecting...");
  //       setGetToken(data.access_token);
  //       data.cookies.set("authToken", getToken);
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(errorData.message || "Login failed, please try again."); // Show error message
  //     }
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //     toast.error("An error occurred while logging in. Please try again."); // Catch unexpected errors
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleUserSignIn = async (event) => {
    event.preventDefault();
    const baseUrl = "/api/login";
    setIsLoading(true);

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

        document.cookie = `authToken=${data.access_token}; path=/; secure; HttpOnly`;
        // setActiveUser(data.access_token);
        localStorage.setItem("authToken", data.access_token);
        handleNavigate();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed, please try again."); // Show error message
      }
    } catch (error) {
      console.error("Error logging in:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center gap-32">
        <Image
          aria-hidden
          src="/authpic.svg"
          alt="Logo"
          width={800}
          height={800}
          className="h-full"
        />
        <div>
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
    </div>
  );
}

export default Login;
