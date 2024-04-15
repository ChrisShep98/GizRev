"use client";
import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!username || !email || !password) {
      setError("Please fill out all fields");
      return;
    }
    try {
      const res = await fetch("https://localhost:8000/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = event.target;
        form.reset();
        router.push("/dashboard");
      } else if (res.status === 400) {
        setError("User with that email already exists");
      }
    } catch (error) {
      setError("Error during registration");
      console.log("Error during registration", error);
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
          <h1 className="text-blue-500 font-bold text-5xl">Register</h1>
          <span className="text-2xl text-gray-500">Register an account here!</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
              className="rounded-md p-3 background bg-slate-600 bg-opacity-5 placeholder:text-gray-600"
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              color="red"
            ></input>
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
              Register
            </button>
          </form>
          {error && <Typography color={"red"}>{error}</Typography>}
          <Link href={"/register"}>Already have an account? Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
