import Upvotebtn from "@/components/Upvotebtn";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import React from "react";
import { format } from "date-fns";

const Page = async ({ params }) => {
  // Fetch the single post based on the provided ID
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!post) {
    return notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <h2 className="text-xl font-semibold mb-4">
        {format(new Date(post.createdAt), "PPP")}
      </h2>
      <p className="text-lg text-gray-700 mb-6">{post.body}</p>
      <Upvotebtn postId={post.id} />
    </main>
  );
};

export default Page;

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const post = await prisma.post.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!post) {
    return {
      title: "Post Not Found - Abhay Posts Media",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: `${post.title} - Abhay Posts Media`,
    description: post.body.slice(0, 110) + "...", // Summary of the post content
  };
}
