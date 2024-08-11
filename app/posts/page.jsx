import prisma from "@/lib/db";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: "Posts | Abhay Posts Media ",
  description: "All Posts by Users of Abhay Posts Media",
};
const Page = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  // Fetch the posts from the API
  const posts = await prisma.post.findMany();

  return (
    <>
      <h1 className="text-center font-bold text-4xl mb-3">
        All Posts By Users
      </h1>
      <ul className="list-none p-0">
        {posts.map((post) => (
          <li className="p-4 border-b" key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-bold">{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Page;
