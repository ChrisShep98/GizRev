"use client";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen justify-center">
      <div className="flex flex-row">
        <div
          className="h-screen bg-ima w-4/6"
          style={{
            backgroundImage: "url(/images/home-bg-slider-img1.jpg)",
            backgroundSize: "cover",
          }}
        />
        <div className="flex-col space-y-7 flex p-6 justify-center mb-60 ml-11">
          <h1 className="text-blue-500 font-bold text-5xl">Login</h1>
          <span className="text-2xl text-gray-500">Welcome ! Login below</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
              className="rounded-md p-3 background bg-slate-600 bg-opacity-5 placeholder:text-gray-600"
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
              color="red"
            ></input>
            <input
              className="rounded-md p-3 background bg-slate-600 bg-opacity-5 placeholder:text-gray-600"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            ></input>
            <button
              className="bg-blue-500 rounded-lg p-3 max-w-32 background text-white"
              type="submit"
            >
              Login
            </button>
          </form>
          {error && <Typography color={"red"}>{error}</Typography>}
          <Link href={"/register"}>Don't have an account? Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
