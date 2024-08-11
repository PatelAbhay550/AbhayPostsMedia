"use server";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

const CreatePosts = async (formData) => {
  const title = formData.get("title") || "Untitled";
  const body = formData.get("body") || "No content";

  await prisma.post.create({
    data: {
      title,
      body,
    },
  });
  redirect("/");
};

export default CreatePosts;
