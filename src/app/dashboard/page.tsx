import React from "react";
import NavBar from "../components/NavBar";
import CreatePost from "../components/CreatePost";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <NavBar />
      <CreatePost />
    </>
  );
};

export default Dashboard;
